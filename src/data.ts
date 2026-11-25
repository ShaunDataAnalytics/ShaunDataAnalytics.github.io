export type MetricHighlight = {
  label: string;
  value: string;
  change?: string;
};

export type TableSchema = {
  tableName: string;
  tableType: "Fact Table" | "Dimension Table" | "Staging View" | "Data Mart";
  grain: string;
  columns: {
    name: string;
    type: string;
    keyType?: "PK" | "FK";
    description: string;
  }[];
};

export type CaseStudyPhase = {
  phaseNumber: number;
  phaseName: string;
  objective: string;
  tech: string[];
  deliverables: string[];
  keyInsight?: string;
};

export type ArchitectureNode = {
  step: string;
  title: string;
  tool: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  repoUrl: string;
  demoUrl?: string;
  category: "AI Systems" | "Machine Learning" | "Data Analytics" | "Web App" | "Productivity";
  projectGroup?: "ai" | "data";
  featured: boolean;
  metrics: MetricHighlight[];
  quickHighlights: string[];
  problemStatement: string;
  architectureFlow?: ArchitectureNode[];
  phases: CaseStudyPhase[];
  schemas?: TableSchema[];
  keyResults: string[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
};

export const projects: Project[] = [
  {
    slug: "sentineldesk",
    title: "SentinelDesk — AI Incident Triage & Automation Console",
    subtitle: "Multilingual Incident Triage, Escalation Gates & Precedent-Grounded Reply Drafting",
    description:
      "Enterprise-grade intelligent support operations platform combining calibrated hybrid classifiers (DistilBERT + k-NN), hierarchical vector retrieval (Redis Vector), and strict precedent-grounded LLM reply drafting with citation validation. Features real-time SLA telemetry, an interactive Kanban triage board, conversion funnels, and major outage burst detection.",
    tech: ["React 19", "Go Gateway", "Python", "Vertex AI", "Redis Vector DB", "Tailwind CSS v4", "Vite", "Recharts"],
    repoUrl: "https://github.com/ShaunDataAnalytics/sentineldesk-showcase",
    demoUrl: "https://sentineldesk-showcase.vercel.app",
    category: "AI Systems",
    projectGroup: "ai",
    featured: true,
    quickHighlights: [
      "Calibrated Multilingual Classification: Type (89.4% F1), Priority (70.4% F1), and Queue (65.5% F1)",
      "Safety & Escalation Gates: Auto-routes security incidents, PII masking, and outage bursts",
      "Hierarchical Precedent Retrieval & Grounded Drafting with Cited Ticket Verification",
      "Full-Featured Triage Console: Kanban Board, Conversion Funnel, Outage Simulator, and SLA Telemetry",
    ],
    metrics: [
      { label: "Type Macro-F1", value: "0.894", change: "89.1% Acc" },
      { label: "Incident Recall", value: "87.0%", change: "93.4% Tuned" },
      { label: "Inference Latency", value: "9.0 ms", change: "p50 Offline" },
      { label: "Grounding Accuracy", value: "100%", change: "Zero Hallucination" },
    ],
    problemStatement:
      "Enterprise support operations face mounting backlogs of unstructured, multilingual incident tickets. Manual triage introduces critical response delays, inconsistent routing, and missed high-severity outages. Typical LLM solutions suffer from hallucinations—inventing corporate policies or citing non-existent ticket numbers. SentinelDesk guarantees zero-hallucination precedent grounding, automated PII sanitization, and strict escalation gates.",
    architectureFlow: [
      { step: "01", title: "Ingestion & PII Masking", tool: "Go Gateway", description: "Sanitizes emails, phones, IPs, and credentials in < 2ms before model exposure." },
      { step: "02", title: "Hybrid Classification", tool: "DistilBERT + k-NN Vote", description: "Blends neural transformer embeddings with 5 nearest solved precedent votes to lift accuracy." },
      { step: "03", title: "Policy & Escalation Gate", tool: "Confidence & Safety Rules", description: "Enforces 9 reason codes to escalate severe incidents or prompt injections to human on-call." },
      { step: "04", title: "Precedent Grounding", tool: "Redis Vector Store", description: "Hierarchically searches routed queues to retrieve exact historical precedent tickets." },
      { step: "05", title: "Citation Validator & UI", tool: "React 19 / Vite / Recharts", description: "Validates all [TKT-xxxxx] citations in the draft against evidence and displays in Kanban console." },
    ],
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Hybrid Classification & Calibration Pipeline",
        objective: "Train multi-head classifier and calibrate confidence probabilities to eliminate overconfident misclassifications.",
        tech: ["Python", "PyTorch", "Hugging Face", "Temperature Scaling", "ECE"],
        deliverables: [
          "Engineered hybrid classifier blending neural logits with 5 nearest neighbour votes (0.5 weight).",
          "Reduced Expected Calibration Error (ECE) to 0.008 on Type and 0.015 on Priority via isotonic calibration.",
          "Attained 87.0% high-priority incident recall on the 20% unseen holdout dataset (8,034 tickets).",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Hierarchical Vector Retrieval & Grounding Validator",
        objective: "Index historical knowledge base and enforce strict zero-hallucination citation checks on generated drafts.",
        tech: ["Redis Vector Search", "Vertex AI / Gemini", "Pydantic", "Python"],
        deliverables: [
          "Implemented hierarchical two-stage KNN search in Redis (queue routing first, then intra-queue KNN).",
          "Built AST citation validator rejecting any draft quoting unretrieved tickets or ungrounded claims.",
          "Enabled cross-lingual evidence synthesis: multilingual embeddings with automated translation into customer language.",
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Go Gateway & Reactive Incident Console",
        objective: "Architect low-latency reverse proxy gateway with streaming telemetry and interactive Kanban UI.",
        tech: ["Go", "React 19", "Tailwind CSS v4", "Recharts", "Vite"],
        deliverables: [
          "Engineered Go proxy handling PII tokenization and burst rate-limiting in sub-millisecond execution.",
          "Constructed responsive React 19 triage dashboard, SLA counters, Kanban board, and outage burst simulator.",
          "Shipped dual-role portal: self-service ticket status tracking for end-users, and analytical funnel for incident managers.",
        ],
      },
    ],
    keyResults: [
      "Achieved 0.894 Macro-F1 across 4 incident types and 87.0% recall on high-priority incidents.",
      "100% citation verification pass rate: zero hallucinated policies or ungrounded ticket IDs displayed to operators.",
      "Sub-10ms classification latency enabling real-time triage before ticket reaches human agent queues.",
    ],
    codeSnippet: {
      language: "python",
      title: "Precedent Grounding Citation & Validation Guardrail",
      code: `def validate_grounded_draft(draft: str, retrieved_precedents: list[Precedent]) -> ValidationResult:
    # Extract all cited ticket tokens, e.g. [TKT-10492]
    cited_ids = set(re.findall(r"\\[(TKT-\\d+)\\]", draft))
    valid_ids = {p.ticket_id for p in retrieved_precedents}

    # Zero-hallucination check: every citation must exist in retrieved evidence
    hallucinated = cited_ids - valid_ids
    if hallucinated:
        return ValidationResult(
            is_valid=False,
            reason=f"Hallucinated precedent citation detected: {hallucinated}",
            action="FALLBACK_TO_EXTRACTIVE"
        )
    return ValidationResult(is_valid=True, action="APPROVE_DRAFT")`,
    },
  },

  {
    slug: "bilingual-neural-audiobook",
    title: "Speechify Socratic Sparring Studio & Neural Audiobook",
    subtitle: "High-Speed Teleprompter, Continuous Practice Drills & Socratic Interrogation",
    description:
      "Interactive audio-first learning workbench combining high-speed neural teleprompter narration, continuous drill practice mode with Auto Grill Me toggle, and 60-second Feynman oral recall drills.",
    tech: ["Web Audio API", "Edge-TTS", "JavaScript", "Python", "Socratic Sparring", "Active Recall"],
    repoUrl: "https://github.com/ShaunDataAnalytics/ShaunDataAnalytics.github.io",
    demoUrl: "https://shaundataanalytics.netlify.app/demos/speechify-socratic/",
    category: "AI Systems",
    projectGroup: "ai",
    featured: true,
    quickHighlights: [
      "Real-Time Sentence Karaoke Teleprompter with Dynamic Highlighting (1.0x-2.0x)",
      "Continuous Practice Mode with Auto Grill Me Toggle to Prevent Popup Interruptions",
      "60-Second Feynman Oral Drills with Live Microphone WPM & Filler Detection",
      "Bilingual Presets: Fox in Socks Vocal Drills, Kimball Modeling & Lifelong Learning",
    ],
    metrics: [
      { label: "Retention Boost", value: "10% ➔ 80%" },
      { label: "Practice Modes", value: "Teleprompter + Grill" },
      { label: "Auto Grill Me", value: "ON / OFF Toggle" },
      { label: "Client Latency", value: "< 15ms" },
    ],
    problemStatement:
      "Knowledge workers face extreme screen fatigue and busy commute schedules. Reading dense 400-page English or Chinese books is physically exhausting, while standard audiobooks lead to passive listening where 90% of content is immediately forgotten.",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Neural Synthesis & Media Pipeline",
        objective: "Automate chapter extraction from EPUB/Markdown and synthesize natural voice streams.",
        tech: ["Python", "Edge-TTS", "ffmpeg", "GitHub Raw CDN"],
        deliverables: [
          "Built batch conversion pipeline generating naturalistic speech models (en-US-ChristopherNeural & zh-CN-YunxiNeural).",
          "Engineered byte-range compatible media streaming hosted on GitHub.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Socratic Sparring Web Interface",
        objective: "Combine fluid audio playback with active cognitive retrieval challenges.",
        tech: ["Web Audio API", "Tailwind CSS", "JavaScript"],
        deliverables: [
          "Designed glassmorphic dual-language player with variable speed controls (0.8x-2.0x).",
          "Integrated Socratic question drawers to force active cognitive recall after every chapter.",
        ],
      },
    ],
    keyResults: [
      "Eliminated screen fatigue by converting dense books into human-like audio streams.",
      "Increased knowledge retention by pairing auditory immersion with instant Socratic recall tests.",
    ],
  },

  {
    slug: "retail-supply-chain-pipeline",
    title: "Retail & Supply Chain Intelligence Pipeline",
    subtitle: "Local-First Automated ETL, Relational Star Schema & SQL Audit Engine",
    description:
      "Production-grade, automated data pipeline analyzing 100,000+ Brazilian e-commerce orders (Olist). Features strict SQLAlchemy type mapping, automated two-way data integrity reconciliation (DataFrame rows vs. SQL distinct keys), Kimball star schema modeling, and advanced analytical SQL business audits.",
    tech: ["Python", "SQLAlchemy 2.0", "SQLite", "DuckDB", "MySQL", "Star Schema", "Analytical SQL", "Automated Testing"],
    repoUrl: "https://github.com/ShaunDataAnalytics/retail-supply-chain-pipeline",
    demoUrl: "/retail-supply-chain-pipeline/",
    category: "Data Analytics",
    projectGroup: "data",
    featured: true,
    quickHighlights: [
      "Local-First Multi-Engine Support: 1-Click Execution across SQLite, DuckDB, and MySQL",
      "Automated Two-Way Data Surgery & Integrity Verification (DF Rows vs SQL Rows)",
      "Production Kimball Star Schema with 4 Fact Tables & 3 Dimension Tables",
      "Strategic SQL Business Audits: Logistics Delay Bottlenecks & CLV Segmentation",
    ],
    metrics: [
      { label: "Data Integrity", value: "100% Passed" },
      { label: "Orders Analyzed", value: "100,000+" },
      { label: "Star Schema Tables", value: "7 Tables" },
      { label: "Audit Latency", value: "< 50ms" },
    ],
    problemStatement:
      "Olist operates the largest department store marketplace in Brazil, connecting tens of thousands of independent merchants with millions of customers across all 27 federative units. Transactional data was siloed across disparate flat files with unstandardized UTC timestamps, lost leading zeros in zip codes, and unpartitioned delivery statuses. Mounting logistics delays in remote states and unpredictable shipping freight costs suppressed customer satisfaction and eroded unit margins without an automated, auditable relational source of truth.",
    architectureFlow: [
      { step: "01", title: "Automated Data Surgery", tool: "Pandas / Regex", description: "Normalizes UTC timestamps, enforces 5-digit zip strings via zfill(5), and quarantines non-positive prices." },
      { step: "02", title: "Star Schema Modeling", tool: "SQLAlchemy ORM", description: "Defines relational star schema with explicit PK/FK constraints across 3 dimension tables and 4 fact tables." },
      { step: "03", title: "Multi-Engine Loading", tool: "SQLite / DuckDB / MySQL", description: "Enforces idempotent batch ingestion supporting local SQLite/DuckDB or production MySQL." },
      { step: "04", title: "Automated Integrity Audit", tool: "Python / SQL Engine", description: "Programmatically reconciles DataFrame row/key counts against database SELECT COUNT(DISTINCT id) queries." },
      { step: "05", title: "Strategic SQL Intelligence", tool: "Analytical SQL / CTEs", description: "Executes 4-phase SQL audit diagnosing northern Brazil transit bottlenecks, category revenue, and CLV power users." },
    ],
    schemas: [
      {
        tableName: "fact_orders",
        tableType: "Fact Table",
        grain: "One row per customer order transaction",
        columns: [
          { name: "order_id", type: "VARCHAR(32)", keyType: "PK", description: "Unique order identifier" },
          { name: "customer_id", type: "VARCHAR(32)", keyType: "FK", description: "Foreign key referencing dim_customers" },
          { name: "order_status", type: "VARCHAR(16)", description: "Delivery status (delivered, shipped, canceled)" },
          { name: "order_purchase_timestamp", type: "DATETIME", description: "Normalized UTC order timestamp" },
          { name: "order_delivered_customer_date", type: "DATETIME", description: "Timestamp order reached customer" },
          { name: "order_estimated_delivery_date", type: "DATETIME", description: "SLA committed delivery date" },
        ],
      },
      {
        tableName: "fact_order_items",
        tableType: "Fact Table",
        grain: "One row per item within an order line",
        columns: [
          { name: "order_id", type: "VARCHAR(32)", keyType: "FK", description: "Parent order identifier" },
          { name: "order_item_id", type: "INT", keyType: "PK", description: "Sequential order line item number" },
          { name: "product_id", type: "VARCHAR(32)", keyType: "FK", description: "Foreign key referencing dim_products" },
          { name: "seller_id", type: "VARCHAR(32)", keyType: "FK", description: "Foreign key referencing dim_sellers" },
          { name: "price", type: "DECIMAL(10,2)", description: "Item selling price (strictly > 0)" },
          { name: "freight_value", type: "DECIMAL(10,2)", description: "Logistics freight shipping charge" },
        ],
      },
      {
        tableName: "fact_payments",
        tableType: "Fact Table",
        grain: "One row per payment installment or transaction",
        columns: [
          { name: "order_id", type: "VARCHAR(32)", keyType: "FK", description: "Parent order identifier" },
          { name: "payment_sequential", type: "INT", keyType: "PK", description: "Sequential installment number" },
          { name: "payment_type", type: "VARCHAR(16)", description: "Payment method (credit_card, boleto, voucher, debit)" },
          { name: "payment_installments", type: "INT", description: "Number of credit installments" },
          { name: "payment_value", type: "DECIMAL(10,2)", description: "Monetary amount paid" },
        ],
      },
      {
        tableName: "dim_customers",
        tableType: "Dimension Table",
        grain: "One row per unique customer session",
        columns: [
          { name: "customer_id", type: "VARCHAR(32)", keyType: "PK", description: "Unique customer session key" },
          { name: "customer_unique_id", type: "VARCHAR(32)", description: "Persistent customer identity across repeat orders" },
          { name: "customer_zip_code_prefix", type: "VARCHAR(5)", description: "Standardized 5-digit Brazilian postal code" },
          { name: "customer_city", type: "VARCHAR(64)", description: "Customer municipality name" },
          { name: "customer_state", type: "VARCHAR(2)", description: "Federative unit 2-letter state code" },
        ],
      },
      {
        tableName: "dim_products",
        tableType: "Dimension Table",
        grain: "One row per catalog product SKU",
        columns: [
          { name: "product_id", type: "VARCHAR(32)", keyType: "PK", description: "Unique product catalog SKU hash" },
          { name: "product_category_name", type: "VARCHAR(64)", description: "Cleaned product category taxonomy" },
          { name: "product_weight_g", type: "FLOAT", description: "Physical shipping weight in grams" },
          { name: "product_length_cm", type: "FLOAT", description: "Package dimension length in centimeters" },
        ],
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Automated Data Surgery & Cleansing",
        objective: "Sanitize raw CSV transactional dumps, enforce leading zero integrity, and quarantine non-positive amounts.",
        tech: ["Pandas", "Regex", "ISO-8601 Timestamp Coercion"],
        deliverables: [
          "Preserved 5-digit Brazilian postal codes using regex zfill(5) normalization, eliminating geographic routing errors.",
          "Standardized heterogeneous timestamp strings into ISO-8601 UTC DATETIME values.",
          "Quarantined and filtered zero/negative pricing anomalies before database loading.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Relational Star Schema ETL & Two-Way Integrity Verification",
        objective: "Design Kimball-style relational star schema and automate DataFrame-to-SQL reconciliation.",
        tech: ["SQLAlchemy 2.0", "SQLite", "DuckDB", "Automated Audit Engine"],
        deliverables: [
          "Defined normalized Star Schema spanning 3 dimension tables and 4 transactional fact tables.",
          "Engineered automated audit comparing DataFrame len/nunique against SQL COUNT and COUNT(DISTINCT).",
          "Achieved 100% data integrity pass rate across all tables during CI pipeline verification.",
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Advanced SQL Business Audit Findings",
        objective: "Execute high-impact analytical queries answering executive logistics, margin, and CLV questions.",
        tech: ["Analytical SQL", "CTEs", "Correlated Subqueries", "Window Functions"],
        deliverables: [
          "Diagnosed critical transit bottlenecks in Northern Brazil (Amapá averaging +12.64 days delay vs SLA).",
          "Identified top 5 revenue-generating sellers per category via correlated subqueries and DENSE_RANK.",
          "Analyzed payment mix economics (Credit Card 74.38% vs Boleto Bancário 18.40% with 48h settlement lag).",
          "Segmented CLV power users generating +$15,551+ spend above the $1,415 population benchmark.",
        ],
      },
    ],
    keyResults: [
      "100% verified relational data integrity between Python extraction layer and relational database.",
      "Diagnosed logistics transit bottlenecks in Northern Brazil (Amapá averaging +12.64 days delay beyond SLA).",
      "Identified VIP power users ($16,966 spend across 42 orders) generating +$15,551+ surplus revenue above benchmark.",
    ],
    codeSnippet: {
      language: "sql",
      title: "Northern Brazil Logistics Transit Bottleneck Audit",
      code: `SELECT 
    c.customer_state,
    COUNT(o.order_id) AS delivered_orders,
    ROUND(AVG(JULIANDAY(o.order_delivered_customer_date) - JULIANDAY(o.order_estimated_delivery_date)), 2) AS avg_delay_days,
    ROUND(MAX(JULIANDAY(o.order_delivered_customer_date) - JULIANDAY(o.order_estimated_delivery_date)), 2) AS max_delay_days
FROM fact_orders o
INNER JOIN dim_customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'delivered'
  AND o.order_delivered_customer_date IS NOT NULL
GROUP BY c.customer_state
ORDER BY avg_delay_days DESC
LIMIT 5;`,
    },
  },

];
