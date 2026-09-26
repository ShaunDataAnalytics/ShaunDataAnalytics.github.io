/**
 * ===================================================================
 * 小测试交互引擎与海报生成脚本 (Quiz Application Engine & Poster Generator)
 * ===================================================================
 * 负责：
 * 1. 答题状态机与 localStorage 本地持久化恢复
 * 2. 题目渲染、选择校验、平滑切换与计分判定
 * 3. 原生 Canvas 1080x1440 竖版高清海报排版与本地二维码绘制
 * 4. 图片下载、长按提示、邀请文案复制与 Web Share API 适配
 * ===================================================================
 */

(function () {
  "use strict";

  // 本地持久化键名
  const STORAGE_KEY = "quiz_eval_state_v1";

  // 运行时应用状态
  const state = {
    step: "cover", // 'cover' | 'quiz' | 'result'
    currentQuestionIndex: 0,
    answers: {}, // { 0: 'A', 1: 'B', ... }
    resultKey: null,
    generatedPosterBlob: null,
    generatedPosterDataUrl: null
  };

  // DOM 元素缓存
  const el = {
    app: document.getElementById("quiz-app"),
    toast: document.getElementById("quiz-toast"),
    posterModal: document.getElementById("poster-modal"),
    posterImg: document.getElementById("poster-preview-img"),
    posterCloseBtn: document.getElementById("poster-close-btn"),
    btnDownloadPoster: document.getElementById("btn-download-poster"),
    btnSharePoster: document.getElementById("btn-share-poster"),
    btnCopyInvite: document.getElementById("btn-copy-invite"),
    manualCopyBox: document.getElementById("manual-copy-box"),
    manualCopyText: document.getElementById("manual-copy-textarea"),
    qrOffscreen: document.getElementById("qr-offscreen-target")
  };

  /**
   * 初始化入口
   */
  function init() {
    loadPersistedState();
    bindGlobalEvents();
    renderCurrentStep();
  }

  /**
   * 从 localStorage 加载答题进度与版本检查
   */
  function loadPersistedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);

      // 验证版本号：若题库版本发生变化，自动清空旧进度，防止答案错位
      if (data && data.version === QUIZ_CONFIG.version) {
        state.step = data.step || "cover";
        state.currentQuestionIndex = data.currentQuestionIndex || 0;
        state.answers = data.answers || {};
        state.resultKey = data.resultKey || null;

        // 边界防卫：题数可能减少
        if (state.currentQuestionIndex >= QUIZ_CONFIG.questions.length) {
          state.currentQuestionIndex = 0;
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("读取本地缓存失败，将重新开始", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * 持久化当前状态到 localStorage
   */
  function saveState() {
    try {
      const data = {
        version: QUIZ_CONFIG.version,
        step: state.step,
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        resultKey: state.resultKey
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("写入本地缓存失败", e);
    }
  }

  /**
   * 重置所有测试数据与进度
   */
  function resetQuiz() {
    state.step = "cover";
    state.currentQuestionIndex = 0;
    state.answers = {};
    state.resultKey = null;
    state.generatedPosterBlob = null;
    state.generatedPosterDataUrl = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    renderCurrentStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * 主渲染路由器
   */
  function renderCurrentStep() {
    saveState();
    if (!el.app) return;

    if (state.step === "cover") {
      renderCoverStep();
    } else if (state.step === "quiz") {
      renderQuizStep();
    } else if (state.step === "result") {
      renderResultStep();
    }
  }

  /**
   * 1. 渲染开场封面页
   */
  function renderCoverStep() {
    const meta = QUIZ_CONFIG.meta;
    const qCount = QUIZ_CONFIG.questions.length;

    const tagsHtml = (meta.coverTags || [])
      .map(t => `<span class="cover-tag">${escapeHtml(t)}</span>`)
      .join("");

    el.app.innerHTML = `
      <header class="quiz-brand-bar">
        <span>${escapeHtml(meta.brandName || "测评中心")}</span>
        <span class="brand-badge">⚡ 体验版</span>
      </header>

      <section class="quiz-card cover-hero">
        <div class="cover-badge">${escapeHtml(meta.badge || "个人优势与潜能探索")}</div>
        <h1 class="cover-title">${escapeHtml(meta.title)}</h1>
        <div class="cover-subtitle">${escapeHtml(meta.subtitle)}</div>

        <div class="cover-intro">
          ${escapeHtml(meta.introText)}
        </div>

        <div class="cover-meta-grid">
          <div class="cover-meta-item">
            <span>⏱️</span> <span>${escapeHtml(meta.estimatedTime || "约 2 分钟")}</span>
          </div>
          <div class="cover-meta-item">
            <span>📝</span> <span>共 ${qCount} 道精选单选题</span>
          </div>
        </div>

        <div class="cover-tags">
          ${tagsHtml}
        </div>

        <button id="btn-start-quiz" class="btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem;">
          开始测评 🚀
        </button>
      </section>
    `;

    document.getElementById("btn-start-quiz").addEventListener("click", () => {
      state.step = "quiz";
      state.currentQuestionIndex = 0;
      renderCurrentStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * 2. 渲染答题页
   */
  function renderQuizStep() {
    const questions = QUIZ_CONFIG.questions;
    const total = questions.length;
    const currentQ = questions[state.currentQuestionIndex];
    const currentAnswer = state.answers[state.currentQuestionIndex];
    const progressPct = Math.round(((state.currentQuestionIndex + 1) / total) * 100);

    const optionsHtml = currentQ.options
      .map((opt, idx) => {
        const isSelected = currentAnswer === opt.scoreTag;
        const letter = String.fromCharCode(65 + idx); // A, B, C...
        return `
          <div class="option-item ${isSelected ? "is-selected" : ""}" data-tag="${escapeHtml(opt.scoreTag)}">
            <div class="option-radio-badge">${letter}</div>
            <div class="option-text">${escapeHtml(opt.text)}</div>
          </div>
        `;
      })
      .join("");

    const isLast = state.currentQuestionIndex === total - 1;
    const canProceed = !!currentAnswer;

    el.app.innerHTML = `
      <section class="quiz-progress-section">
        <div class="progress-header">
          <span>进度：<span class="step-highlight">第 ${state.currentQuestionIndex + 1} / ${total} 题</span></span>
          <span>${progressPct}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progressPct}%;"></div>
        </div>
      </section>

      <section class="quiz-card">
        <div class="question-title">
          ${state.currentQuestionIndex + 1}. ${escapeHtml(currentQ.title)}
        </div>

        <div class="options-list" id="options-container">
          ${optionsHtml}
        </div>

        <div class="nav-actions">
          <button id="btn-prev-question" class="btn-secondary">
            ← 上一题
          </button>
          <button id="btn-next-question" class="btn-primary" ${canProceed ? "" : "disabled"}>
            ${isLast ? "查看测评结果 🎯" : "下一题 →"}
          </button>
        </div>
      </section>
    `;

    // 绑定选项点击事件
    const optionEls = el.app.querySelectorAll(".option-item");
    const nextBtn = document.getElementById("btn-next-question");

    optionEls.forEach(item => {
      item.addEventListener("click", () => {
        const scoreTag = item.getAttribute("data-tag");
        state.answers[state.currentQuestionIndex] = scoreTag;

        // 更新选中态样式
        optionEls.forEach(o => o.classList.remove("is-selected"));
        item.classList.add("is-selected");

        // 解除禁用
        if (nextBtn) {
          nextBtn.disabled = false;
        }

        saveState();
      });
    });

    // 绑定上一题
    document.getElementById("btn-prev-question").addEventListener("click", () => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderCurrentStep();
      } else {
        state.step = "cover";
        renderCurrentStep();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 绑定下一题 / 查看结果
    nextBtn.addEventListener("click", () => {
      if (!state.answers[state.currentQuestionIndex]) return;

      if (state.currentQuestionIndex < total - 1) {
        state.currentQuestionIndex++;
        renderCurrentStep();
      } else {
        // 完成全部题目，执行计分规则
        const resultKey = QUIZ_CONFIG.evaluateRule(state.answers);
        state.resultKey = resultKey;
        state.step = "result";
        renderCurrentStep();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * 3. 渲染结果页
   */
  function renderResultStep() {
    const resultKey = state.resultKey || "A";
    const result = QUIZ_CONFIG.results[resultKey] || QUIZ_CONFIG.results.A;
    const nextStep = QUIZ_CONFIG.nextStep;

    const strengthsHtml = (result.strengths || [])
      .map(
        s => `
        <li class="feature-list-item">
          <span class="icon">✓</span>
          <span>${escapeHtml(s)}</span>
        </li>
      `
      )
      .join("");

    const adviceHtml = (result.advice || [])
      .map(
        (a, i) => `
        <li class="feature-list-item">
          <span class="icon" style="color: #f59e0b; font-weight: bold;">0${i + 1}</span>
          <span>${escapeHtml(a)}</span>
        </li>
      `
      )
      .join("");

    // 后续引导模块（仅在 enabled: true 时展示）
    let nextStepHtml = "";
    if (nextStep && nextStep.enabled) {
      nextStepHtml = `
        <section class="quiz-card next-step-card">
          ${nextStep.tag ? `<div class="next-step-badge">${escapeHtml(nextStep.tag)}</div>` : ""}
          <div class="next-step-title">${escapeHtml(nextStep.title)}</div>
          <div class="next-step-desc">${escapeHtml(nextStep.description)}</div>
          
          ${
            nextStep.buttonText && nextStep.buttonUrl
              ? `<a href="${escapeHtml(nextStep.buttonUrl)}" target="_blank" class="btn-primary" style="display:inline-flex; width: 100%; text-decoration:none;">
                  ${escapeHtml(nextStep.buttonText)}
                </a>`
              : ""
          }

          ${
            nextStep.contactText
              ? `<div class="next-step-contact">${escapeHtml(nextStep.contactText)}</div>`
              : ""
          }

          ${
            nextStep.qrCodeImg
              ? `<div style="text-align:center; margin-top:1.1rem;">
                  <img src="${escapeHtml(nextStep.qrCodeImg)}" style="max-width:140px; width:100%; border-radius:10px; border:1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" alt="群二维码" />
                  <div style="font-size:0.8rem; color:#64748b; margin-top:0.4rem;">📱 微信长按或扫码直接入群</div>
                </div>`
              : ""
          }
        </section>
      `;
    }

    el.app.innerHTML = `
      <section class="quiz-card result-header-card">
        <div class="result-prefix">你的专属测评画像</div>
        <h1 class="result-name">${escapeHtml(result.name)}</h1>
        <div class="result-badge">${escapeHtml(result.badge)}</div>

        <div class="result-quote-box">
          ${escapeHtml(result.posterQuote)}
        </div>

        <div style="text-align: left;">
          <div class="result-section-title">💡 深度画像解析</div>
          <p class="result-summary-text">${escapeHtml(result.summary)}</p>

          <div class="result-section-title">🌟 核心超能力</div>
          <ul class="feature-list">${strengthsHtml}</ul>

          ${
            result.pitfall
              ? `<div class="pitfall-box">
                  <strong>⚠️ 潜在盲区警示：</strong>${escapeHtml(result.pitfall)}
                </div>`
              : ""
          }

          <div class="result-section-title">🚀 80/20 高效破局建议</div>
          <ul class="feature-list">${adviceHtml}</ul>
        </div>
      </section>

      <section class="result-action-cluster">
        <button id="btn-open-poster-modal" class="btn-primary btn-generate-poster">
          📸 生成高清分享海报
        </button>
        <button id="btn-retest-quiz" class="btn-secondary btn-retest">
          🔄 重新测评
        </button>
      </section>

      ${nextStepHtml}
    `;

    // 绑定海报生成与重新测试
    document.getElementById("btn-open-poster-modal").addEventListener("click", () => {
      generateSharePoster(result);
    });

    document.getElementById("btn-retest-quiz").addEventListener("click", () => {
      if (confirm("确认要清除记录并重新进行测评吗？")) {
        resetQuiz();
      }
    });
  }

  /**
   * 4. 生成分享海报（原生 Canvas 绘制 1080 x 1440 竖版图片）
   */
  function generateSharePoster(result) {
    showToast("正在排版绘制高清海报，请稍候...");

    // 确保生成离屏二维码
    generateQrCodeImage(getShareUrl(), (qrCanvasOrImg) => {
      renderPosterCanvas(result, qrCanvasOrImg);
    });
  }

  /**
   * 获取用于二维码和分享的公开网址
   */
  function getShareUrl() {
    const meta = QUIZ_CONFIG.meta;
    // 如果已经在 http/https 公网环境且非本地回环，使用真实访问地址，否则使用配置里的公开地址
    const loc = window.location;
    if (loc.protocol.startsWith("http") && !loc.hostname.includes("localhost") && !loc.hostname.includes("127.0.0.1")) {
      return loc.origin + loc.pathname;
    }
    return meta.publicShareUrl || "https://your-domain.com/quiz";
  }

  /**
   * 使用离屏 QRCode.js 生成二维码
   */
  function generateQrCodeImage(text, callback) {
    if (!el.qrOffscreen) {
      const off = document.createElement("div");
      off.id = "qr-offscreen-target";
      off.className = "offscreen-container";
      document.body.appendChild(off);
      el.qrOffscreen = off;
    }

    el.qrOffscreen.innerHTML = "";

    try {
      new QRCode(el.qrOffscreen, {
        text: text,
        width: 180,
        height: 180,
        colorDark: "#1e293b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      // 稍微延迟一帧以等待 QRCode 内部 canvas/img 准备完成
      setTimeout(() => {
        const qrCanvas = el.qrOffscreen.querySelector("canvas");
        const qrImg = el.qrOffscreen.querySelector("img");
        if (qrCanvas) {
          callback(qrCanvas);
        } else if (qrImg && qrImg.src) {
          if (qrImg.complete && qrImg.naturalWidth > 0) {
            callback(qrImg);
          } else {
            const img = new Image();
            img.onload = () => callback(img);
            img.onerror = () => callback(null);
            img.src = qrImg.src;
          }
        } else {
          callback(null);
        }
      }, 60);
    } catch (err) {
      console.error("二维码生成异常", err);
      callback(null);
    }
  }

  /**
   * 原生 Canvas 排版与绘制
   */
  function renderPosterCanvas(result, qrElement) {
    const width = 1080;
    const height = 1440;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // 1. 背景渐变绘制 (清爽浅色质感)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, "#f8fafc");
    bgGradient.addColorStop(0.5, "#f1f5f9");
    bgGradient.addColorStop(1, "#e2e8f0");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. 顶部微光与装饰边框卡片
    const cardMarginX = 60;
    const cardMarginY = 60;
    const cardW = width - cardMarginX * 2;
    const cardH = height - cardMarginY * 2;
    const cardRadius = 36;

    // 绘制卡片阴影
    ctx.save();
    ctx.shadowColor = "rgba(15, 23, 42, 0.08)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 16;
    drawRoundedRect(ctx, cardMarginX, cardMarginY, cardW, cardH, cardRadius);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();

    // 绘制卡片边框
    ctx.save();
    drawRoundedRect(ctx, cardMarginX, cardMarginY, cardW, cardH, cardRadius);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 顶部品牌彩色渐变条
    ctx.save();
    drawRoundedRectTopOnly(ctx, cardMarginX, cardMarginY, cardW, 12, cardRadius);
    const brandGrad = ctx.createLinearGradient(cardMarginX, 0, cardMarginX + cardW, 0);
    brandGrad.addColorStop(0, "#0d9488");
    brandGrad.addColorStop(0.6, "#2dd4bf");
    brandGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = brandGrad;
    ctx.fill();
    ctx.restore();

    let cursorY = cardMarginY + 80;

    // 3. 顶部品牌与徽标
    ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#0d9488";
    ctx.textAlign = "center";
    ctx.fillText(QUIZ_CONFIG.meta.badge || "✦ 个人优势与能量探索", width / 2, cursorY);

    cursorY += 55;
    ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#1e293b";
    ctx.fillText(QUIZ_CONFIG.meta.title, width / 2, cursorY);

    cursorY += 45;
    ctx.font = "24px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText(QUIZ_CONFIG.meta.brandName || "Growth Lab 独家研发", width / 2, cursorY);

    // 分割线
    cursorY += 45;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cardMarginX + 40, cursorY);
    ctx.lineTo(cardMarginX + cardW - 40, cursorY);
    ctx.stroke();

    // 4. 测评结果核心区
    cursorY += 65;
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("我的专属测试画像", width / 2, cursorY);

    cursorY += 65;
    let nameFontSize = 52;
    ctx.font = `bold ${nameFontSize}px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif`;
    while (ctx.measureText(result.name).width > cardW - 80 && nameFontSize > 32) {
      nameFontSize -= 2;
      ctx.font = `bold ${nameFontSize}px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif`;
    }
    ctx.fillStyle = "#0f766e"; // 深青绿
    ctx.fillText(result.name, width / 2, cursorY);

    cursorY += 48;
    // 标签胶囊背景
    const badgeText = result.badge;
    ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    const badgeWidth = ctx.measureText(badgeText).width + 48;
    const badgeHeight = 44;
    const badgeX = (width - badgeWidth) / 2;
    drawRoundedRect(ctx, badgeX, cursorY, badgeWidth, badgeHeight, 22);
    ctx.fillStyle = "#f0fdfa";
    ctx.fill();
    ctx.strokeStyle = "#5eead4";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#0d9488";
    ctx.textAlign = "center";
    ctx.fillText(badgeText, width / 2, cursorY + 30);

    // 5. 独立海报短文案与金句框
    cursorY += 85;
    const quoteBoxW = cardW - 100;
    const quoteBoxX = cardMarginX + 50;
    const quoteText = `“ ${result.posterQuote} ”`;

    ctx.font = "bold 34px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    const quoteLines = wrapText(ctx, quoteText, quoteBoxW - 60);
    const quoteBoxH = quoteLines.length * 52 + 50;

    drawRoundedRect(ctx, quoteBoxX, cursorY, quoteBoxW, quoteBoxH, 18);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#1e293b";
    ctx.textAlign = "center";
    quoteLines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, cursorY + 48 + idx * 52);
    });

    cursorY += quoteBoxH + 45;

    // 6. 三大核心特征小药丸展示
    if (result.strengths && result.strengths.length > 0) {
      ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
      ctx.textAlign = "left";
      const startTagY = cursorY;
      const tagSpacing = 48;

      result.strengths.forEach((trait, i) => {
        const itemY = startTagY + i * tagSpacing;
        // 小圆圈
        ctx.beginPath();
        ctx.arc(cardMarginX + 70, itemY + 12, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#14b8a6";
        ctx.fill();

        ctx.fillStyle = "#334155";
        ctx.fillText(trait, cardMarginX + 96, itemY + 20);
      });
      cursorY += result.strengths.length * tagSpacing + 20;
    }

    // 7. 底部扫码与导流卡片
    const footerY = cardMarginY + cardH - 240;
    const footerW = cardW - 80;
    const footerX = cardMarginX + 40;
    const footerH = 200;

    drawRoundedRect(ctx, footerX, footerY, footerW, footerH, 20);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 底部左侧文字
    ctx.textAlign = "left";
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#0f766e";
    ctx.fillText("长按或扫码 · 测测你的求职型格", footerX + 40, footerY + 66);

    ctx.font = "21px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("全国已有 3,600+ 求职伙伴参与测评", footerX + 40, footerY + 110);

    ctx.font = "19px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`共 ${QUIZ_CONFIG.questions.length} 道真实情景实测 · 获取专属破局指南`, footerX + 40, footerY + 150);

    // 底部右侧绘制二维码
    const qrSize = 140;
    const qrX = footerX + footerW - qrSize - 30;
    const qrY = footerY + (footerH - qrSize) / 2;

    // 二维码白色衬底
    ctx.fillStyle = "#ffffff";
    drawRoundedRect(ctx, qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 10);
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.stroke();

    if (qrElement) {
      ctx.drawImage(qrElement, qrX, qrY, qrSize, qrSize);
    } else {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("扫码测试", qrX + qrSize / 2, qrY + qrSize / 2);
    }

    // 8. 导出图像并弹窗展示
    const dataUrl = canvas.toDataURL("image/png");
    state.generatedPosterDataUrl = dataUrl;

    canvas.toBlob((blob) => {
      state.generatedPosterBlob = blob;
      openPosterModal(dataUrl, result);
    }, "image/png");
  }

  /**
   * 打开海报展示弹窗
   */
  function openPosterModal(imgSrc, result) {
    if (!el.posterModal || !el.posterImg) return;
    el.posterImg.src = imgSrc;
    el.posterModal.classList.add("is-active");

    // 检查 Web Share API 是否可用且支持文件分享
    if (navigator.canShare && state.generatedPosterBlob) {
      try {
        const testFile = new File([state.generatedPosterBlob], "test.png", { type: "image/png" });
        if (navigator.canShare({ files: [testFile] })) {
          el.btnSharePoster.style.display = "inline-flex";
        } else {
          el.btnSharePoster.style.display = "none";
        }
      } catch (e) {
        el.btnSharePoster.style.display = "none";
      }
    } else {
      el.btnSharePoster.style.display = "none";
    }

    // 隐藏降级复制输入框
    if (el.manualCopyBox) el.manualCopyBox.style.display = "none";
  }

  /**
   * 关闭海报弹窗
   */
  function closePosterModal() {
    if (el.posterModal) {
      el.posterModal.classList.remove("is-active");
    }
  }

  /**
   * 下载图片
   */
  function downloadPoster() {
    if (!state.generatedPosterDataUrl) return;
    const a = document.createElement("a");
    const resultName = (QUIZ_CONFIG.results[state.resultKey] || {}).name || "测试结果";
    a.download = `${resultName}-分享海报.png`;
    a.href = state.generatedPosterDataUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("海报下载已启动！若未自动保存请长按图片");
  }

  /**
   * 调用浏览器原生系统分享 (Web Share API)
   */
  async function sharePosterViaSystem() {
    if (!state.generatedPosterBlob) {
      downloadPoster();
      return;
    }
    const currentResult = QUIZ_CONFIG.results[state.resultKey] || QUIZ_CONFIG.results.A;
    const shareUrl = getShareUrl();
    const file = new File([state.generatedPosterBlob], "quiz-result.png", { type: "image/png" });

    try {
      await navigator.share({
        title: QUIZ_CONFIG.meta.title,
        text: `我测出了【${currentResult.name}】，快来看看你的能量人格！`,
        url: shareUrl,
        files: [file]
      });
      showToast("分享成功！");
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("系统分享受限，转为直接下载", err);
        downloadPoster();
      }
    }
  }

  /**
   * 复制分享文案与链接到剪贴板
   */
  function copyInviteText() {
    const currentResult = QUIZ_CONFIG.results[state.resultKey] || QUIZ_CONFIG.results.A;
    const shareUrl = getShareUrl();
    const template = QUIZ_CONFIG.meta.shareTemplate || "我刚刚测出了【{RESULT}】！快来测测你属于哪种风格 👉 {URL}";
    const fullText = template
      .replace("{RESULT}", currentResult.name)
      .replace("{URL}", shareUrl);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(fullText)
        .then(() => {
          showToast("已复制分享文案与链接！");
        })
        .catch(() => {
          fallbackManualCopy(fullText);
        });
    } else {
      fallbackManualCopy(fullText);
    }
  }

  /**
   * 剪贴板不可用时的降级方案
   */
  function fallbackManualCopy(text) {
    if (el.manualCopyBox && el.manualCopyText) {
      el.manualCopyBox.style.display = "block";
      el.manualCopyText.value = text;
      el.manualCopyText.select();
      showToast("请长按或Ctrl+C复制下方文本框中的文案");
    }
  }

  /**
   * 全局事件绑定
   */
  function bindGlobalEvents() {
    if (el.posterCloseBtn) {
      el.posterCloseBtn.addEventListener("click", closePosterModal);
    }

    if (el.posterModal) {
      el.posterModal.addEventListener("click", (e) => {
        if (e.target === el.posterModal) {
          closePosterModal();
        }
      });
    }

    if (el.btnDownloadPoster) {
      el.btnDownloadPoster.addEventListener("click", downloadPoster);
    }

    if (el.btnSharePoster) {
      el.btnSharePoster.addEventListener("click", sharePosterViaSystem);
    }

    if (el.btnCopyInvite) {
      el.btnCopyInvite.addEventListener("click", copyInviteText);
    }
  }

  /**
   * 浮动轻提示 Toast
   */
  let toastTimer = null;
  function showToast(msg) {
    if (!el.toast) return;
    el.toast.textContent = msg;
    el.toast.classList.add("is-show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove("is-show");
    }, 2800);
  }

  /**
   * Canvas 工具：文本多行折行
   */
  function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const testLine = currentLine + char;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  /**
   * Canvas 工具：全圆角矩形
   */
  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * Canvas 工具：仅上圆角矩形
   */
  function drawRoundedRectTopOnly(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * XSS 简单转义防御
   */
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 页面就绪启动
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
