/**
 * Time Personality Type Quiz — configuration (Career Pulse demo)
 * Six scenario questions · four time-personality archetypes · client-side scoring
 */

const QUIZ_CONFIG = {
  version: "2.1.0-en",

  meta: {
    title: "Time Personality Type Quiz",
    subtitle: "How you spend attention under job-search pressure—and your 80/20 breakthrough path",
    badge: "✦ 2026 Time & Energy Diagnostic",
    brandName: "Career Pulse · Time Personality Lab",
    estimatedTime: "~2 minutes",
    questionCountText: "6 high-signal scenario questions",
    introText:
      "The bottleneck is often not skill—it is how your time personality reacts to uncertainty. Endless resume tweaks but no applications? Read receipts with no reply and instant self-doubt? Six realistic scenarios reveal your default time pattern and a focused 80/20 way forward.",
    coverTags: ["Targeted apply", "Less rumination", "Sustainable pace", "Peer support"],
    publicShareUrl: "https://shaundataanalytics.github.io/career-pulse-quiz/",
    shareTemplate:
      "I got 【{RESULT}】 on the Time Personality Type quiz—it nailed how I use time when job searching. What's your type? 👉 {URL}",
  },

  questions: [
    {
      id: 1,
      title:
        'You see a role you love, but the posting asks for "5+ years" and you have 2–3. Your first instinct is to—',
      options: [
        { id: "A", text: "Save it and plan to finish another course before applying", scoreTag: "A" },
        { id: "B", text: "Apply anyway—volume and luck beat overthinking", scoreTag: "B" },
        { id: "C", text: "Close the tab, feel unqualified, and question your path", scoreTag: "C" },
        { id: "D", text: "Want to ask someone who works there but hesitate, then drop it", scoreTag: "D" },
      ],
    },
    {
      id: 2,
      title: 'This week you said you would "go all in on the search." Where did most of your time actually go?',
      options: [
        { id: "A", text: "Font spacing, resume versions, saving interview scripts on social apps", scoreTag: "A" },
        { id: "B", text: "Mass swiping apply with default cover letters", scoreTag: "B" },
        { id: "C", text: "Replaying rejections and parsing every word you said wrong", scoreTag: "C" },
        { id: "D", text: "Solo grinding skills with zero outreach—you hide the search from everyone", scoreTag: "D" },
      ],
    },
    {
      id: 3,
      title: 'Your resume shows "Viewed by recruiter"—two days, no reply. The loudest inner voice says—',
      options: [
        { id: "A", text: '"My metrics are not sharp enough—I need another rewrite"', scoreTag: "A" },
        { id: "B", text: '"Whatever—next! I will blast 20 more companies today"', scoreTag: "B" },
        { id: "C", text: '"I am worthless; I cannot even pass screening"', scoreTag: "C" },
        { id: "D", text: "This is exhausting—you sigh and carry it alone", scoreTag: "D" },
      ],
    },
    {
      id: 4,
      title: "In an interview, you get a question you did not prep. Your honest reaction is—",
      options: [
        { id: "A", text: "Regret not having a 500-question bank—plan an all-nighter debrief", scoreTag: "A" },
        { id: "B", text: "Wing it and forget—plenty of backups", scoreTag: "B" },
        { id: "C", text: "Loop the awkward seconds for days", scoreTag: "C" },
        { id: "D", text: "Smile through it, then crash at home with the curtains drawn", scoreTag: "D" },
      ],
    },
    {
      id: 5,
      title: "When people ask about your gap or search, your go-to defense is—",
      options: [
        { id: "A", text: '"After this cert / side project, I will go big on interviews"', scoreTag: "A" },
        { id: "B", text: '"As long as my apply count rises, today was not wasted"', scoreTag: "B" },
        { id: "C", text: '"Maybe I am not cut out for this—I should exit or settle"', scoreTag: "C" },
        { id: "D", text: "Post a curated busy-life update while anxiety stays private", scoreTag: "D" },
      ],
    },
    {
      id: 6,
      title: 'If you could pick one "time hack" right now, you would want—',
      options: [
        { id: "A", text: "A coach to cut 80% of prep and force a good-enough apply today", scoreTag: "A" },
        { id: "B", text: "A path to the hiring manager—not blind ATS volume", scoreTag: "B" },
        { id: "C", text: "A reset so interviews feel like conversations, not trials", scoreTag: "C" },
        { id: "D", text: "A small crew for referrals, reality checks, and morale", scoreTag: "D" },
      ],
    },
  ],

  results: {
    A: {
      key: "A",
      name: "The Preparation Timekeeper",
      badge: "Research collector · resume perfection loop · readiness as shelter",
      posterQuote: "As long as I am still optimizing, I am not truly rejected.",
      summary:
        "You care deeply about quality, but preparation can become a time personality: collecting resources beats shipping. One more portfolio pass, one more cert—readiness feels safer than market feedback. You rarely lack ability; you lack a clock that says 'good enough, send.'",
      strengths: [
        "Strong synthesis and deep learning",
        "High standards on deliverable quality",
        "Systems thinking and long-horizon planning",
      ],
      pitfall: "Tactical prep masks fear of rejection and burns the application window.",
      advice: [
        "15-minute skateboard MVP: pick one role, no layout changes, hit submit before the timer ends.",
        "An 80% resume in the right inbox beats a 100% file on your disk.",
        "Treat each outcome as a free stress test—iterate from reality, not imagination.",
      ],
    },
    B: {
      key: "B",
      name: "The Volume Sprinter",
      badge: "Batch apply · motion over meaning · lottery mindset",
      posterQuote: "Fifty clicks a day—but each silence makes the next feel colder.",
      summary:
        "You move fast when uncertain, using busy motion to numb anxiety. Hundreds of applications without reading the team's problem statement. Low conversion erodes confidence even while the activity meter looks full.",
      strengths: ["Resilience and high action bias", "Fast execution, low hesitation", "Willing to try many paths"],
      pitfall: "Search becomes a numbers game with no tailoring—you disappear in ATS noise.",
      advice: [
        "Sniper rule: pause blind batch apply for 3 days; pick 3 target teams only.",
        "Write a 200-word pain letter: what you can fix for them this quarter.",
        "Reach the hiring manager or IC lead directly—often 5× the response rate.",
      ],
    },
    C: {
      key: "C",
      name: "The Signal Interpreter",
      badge: "Read-receipt rumination · micro-signal detective · impostor loop",
      posterQuote: "They frowned once—I planned my career funeral in my head.",
      summary:
        "You read people and context sharply, but job search turns every delay into self-judgment. Late reply means you offended someone; the JD feels like a personal indictment. Random noise becomes a verdict on your worth.",
      strengths: [
        "Emotional intelligence and empathy",
        "Strong ownership and team awareness",
        "Deep trust relationships unlock your best work",
      ],
      pitfall: "You fuse one outcome with lifetime identity and drain your calendar on rumination.",
      advice: [
        "Physics reset: hiring is procurement, not a courtroom. A frown may be fatigue or Wi-Fi.",
        "Reframe: not 'Do they like me?' but 'Does this team deserve my next two years?'",
        "After each interview, one small reward and a hard stop on replay—protect evening time.",
      ],
    },
    D: {
      key: "D",
      name: "The Solo Deep Diver",
      badge: "Carry it alone · shame around asking · silent endurance",
      posterQuote: "I won't worry family or bother friends—I submerge alone.",
      summary:
        "You are independent and proud, but search becomes an island. Hours of solo study instead of one warm intro. Hidden stress pushes you toward burnout at the edge of your calendar.",
      strengths: [
        "Self-directed deep work",
        "Reliable—you don't create drag for others",
        "Stamina under adversity",
      ],
      pitfall: "Asking feels like weakness, so information and referrals stay locked away.",
      advice: [
        "Most strong roles never hit the public board—weak ties matter.",
        "Vulnerability experiment: message one former colleague today—no ask, just reconnect.",
        "Join a small accountability pod so time spent searching is shared, not secret.",
      ],
    },
  },

  evaluateRule: function (answers) {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach((val) => {
      if (counts[val] !== undefined) {
        counts[val]++;
      }
    });

    let highestTag = "A";
    let maxScore = -1;
    for (const tag of ["A", "B", "C", "D"]) {
      if (counts[tag] > maxScore) {
        maxScore = counts[tag];
        highestTag = tag;
      }
    }

    const topTags = Object.keys(counts).filter((tag) => counts[tag] === maxScore);
    if (topTags.length > 1) {
      const q1Ans = answers[0];
      if (topTags.includes(q1Ans)) {
        return q1Ans;
      }
      const q6Ans = answers[5];
      if (topTags.includes(q6Ans)) {
        return q6Ans;
      }
      const q3Ans = answers[2];
      if (topTags.includes(q3Ans)) {
        return q3Ans;
      }
      return topTags[0];
    }

    return highestTag;
  },

  nextStep: {
    enabled: false,
    tag: "🤝 Community · limited seats",
    title: "You do not have to run the clock alone",
    description:
      "Job search is a long mental game. Solo mode breeds learned helplessness. Book a free 1:1 breakthrough chat or scan to join a peer support group for referrals and energy.",
    buttonText: "👉 Book a free 1:1 diagnostic",
    buttonUrl: "https://your-domain.com/survey-booking",
    contactText: "Or scan the QR code / WeChat: CareerPartner01 (note: Time Personality)",
    qrCodeImg: "assets/group-qr.svg",
  },
};

if (typeof window !== "undefined") {
  window.QUIZ_CONFIG = QUIZ_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = QUIZ_CONFIG;
}
