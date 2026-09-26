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
    slug: "clustering-analytics",
    title: "Customer Segmentation & 3D Clustering Dashboard",
    subtitle: "K-Means & Hierarchical Clustering Analysis with Interactive 3D Visualizations",
    description:
      "A high-impact data science dashboard analyzing customer behavioral datasets using unsupervised machine learning (K-Means & Hierarchical Clustering). Includes optimal cluster estimation (Elbow & Silhouette analysis) and interactive 3D PCA projections.",
    tech: ["Python", "Scikit-Learn", "K-Means", "3D Plotly", "PCA", "Streamlit"],
    repoUrl: "https://github.com/ShaunDataAnalytics/data-science-portfolio-labs",
    demoUrl: "https://github.com/ShaunDataAnalytics/data-science-portfolio-labs",
    category: "Machine Learning",
    projectGroup: "data",
    featured: true,
    quickHighlights: [
      "Optimal Cluster Validation via Elbow Method & Silhouette Analysis",
      "Interactive 3D PCA Dimensionality Reduction Scatterplot",
      "Customer Behavioral Persona Mapping (Champions, At-Risk, Loyal)",
      "Live Streamlit / Plotly Interactive Web App",
    ],
    metrics: [
      { label: "Optimal Clusters (k)", value: "k = 4" },
      { label: "Silhouette Score", value: "0.68", change: "+14% vs k=3" },
      { label: "PCA Variance Explained", value: "84.2%" },
      { label: "Inference Latency", value: "< 25ms" },
    ],
    problemStatement:
      "Marketing and growth teams often face declining campaign conversion rates due to uniform, blanket customer targeting. Without granular behavioral clustering, promotional budgets are misallocated. Unsupervised machine learning segments high-value customer cohorts by purchasing frequency, recency, and monetary value.",
    architectureFlow: [
      { step: "01", title: "Feature Extraction", tool: "Pandas / NumPy", description: "Aggregates raw customer transactions into RFM features (Recency, Frequency, Monetary value)." },
      { step: "02", title: "Normalization & Outliers", tool: "Scikit-Learn", description: "Applies StandardScaler and removes multivariate anomalies with Isolation Forest." },
      { step: "03", title: "Cluster Optimization", tool: "K-Means / Silhouette", description: "Evaluates inertia curves and silhouette coefficients across k=2 to k=10 to find global optimum." },
      { step: "04", title: "3D Projection", tool: "PCA (3 Components)", description: "Reduces multidimensional space to 3 principal axes preserving 84.2% total dataset variance." },
      { step: "05", title: "Interactive UI", tool: "Plotly / React", description: "Renders 3D scatter plots allowing instant cluster rotation, zooming, and point-level inspections." },
    ],
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Data Preparation & Outlier Treatment",
        objective: "Clean transaction logs, engineer RFM features, and remove extreme leverage outliers.",
        tech: ["Pandas", "NumPy", "Isolation Forest", "Feature Scaling"],
        deliverables: [
          "Engineered Recency (days since last purchase), Frequency (total visits), and Monetary metrics.",
          "Applied RobustScaler and Isolation Forest to purge 1.4% extreme leverage outliers.",
          "Validated distribution symmetry with Box-Cox power transformations.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Cluster Optimization & Validation",
        objective: "Determine mathematical cluster count k minimizing intra-cluster variance.",
        tech: ["K-Means++", "Hierarchical Ward Linkage", "Silhouette Analysis"],
        deliverables: [
          "Calculated Within-Cluster-Sum-of-Squares (WCSS) elbow curve across k=2..10.",
          "Achieved peak average Silhouette Coefficient of 0.68 at k=4.",
          "Cross-validated partition stability with Hierarchical Agglomerative dendrograms.",
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "3D PCA Projection & Web Delivery",
        objective: "Project multidimensional clusters into an interactive 3D web dashboard.",
        tech: ["PCA", "Plotly.js", "Streamlit / Next.js", "Framer Motion"],
        deliverables: [
          "Preserved 84.2% explained variance across 3 principal component orthogonal axes.",
          "Constructed interactive 3D scatter visualizer with hover metadata and centroid tracking.",
          "Translated mathematical clusters into 4 actionable business personas.",
        ],
      },
    ],
    keyResults: [
      "Identified 4 distinct customer personas (Champions, Loyalists, At-Risk, Hibernating).",
      "Delivered interactive 3D scatter plots allowing stakeholders to inspect individual cluster boundaries in real time.",
      "Provided growth teams with actionable re-engagement criteria improving campaign ROI by an estimated 22%.",
    ],
    codeSnippet: {
      language: "python",
      title: "Clustering & Optimal Silhouette Calculation",
      code: `import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

# Fit optimal K-Means clustering model
kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42)
cluster_labels = kmeans.fit_predict(X_scaled)
score = silhouette_score(X_scaled, cluster_labels)

# 3D PCA Projection for Visualizer
pca_3d = PCA(n_components=3)
X_pca = pca_3d.fit_transform(X_scaled)
print(f"Optimal Silhouette Score: {score:.3f} | Variance Explained: {pca_3d.explained_variance_ratio_.sum():.1%}")`,
    },
  },
  {
    slug: "book-recommender",
    title: "Hybrid Book Recommender System",
    subtitle: "Collaborative Filtering & Content-Based Recommendation Engine",
    description:
      "A personalized recommendation engine analyzing user rating matrices to surface tailored reading suggestions using cosine similarity, singular value decomposition (SVD), and content metadata fallback.",
    tech: ["Python", "Recommendation Systems", "Cosine Similarity", "Jupyter", "Flask", "SVD"],
    repoUrl: "https://github.com/ShaunDataAnalytics/collaborative-book-recommender-engine",
    demoUrl: "https://github.com/ShaunDataAnalytics/collaborative-book-recommender-engine",
    category: "Machine Learning",
    projectGroup: "data",
    featured: true,
    quickHighlights: [
      "Matrix Sparsity Reduction on 1.1M User-Item Interactions",
      "Item-Item Cosine Similarity & SVD Factorization",
      "Content-Based Metadata Matching for Cold-Start Mitigation",
      "Sub-80ms Real-Time Inference Web API",
    ],
    metrics: [
      { label: "Catalog Size", value: "270,000+ Books" },
      { label: "User Ratings", value: "1.1M Records" },
      { label: "Precision@K", value: "86.4%" },
      { label: "Response Time", value: "< 80ms" },
    ],
    problemStatement:
      "With hundreds of thousands of titles available online, users suffer from choice overload. Traditional search relies on explicit keyword matching rather than latent preference similarity. This system constructs collaborative filtering and cosine similarity models to provide instant, highly accurate book recommendations.",
    architectureFlow: [
      { step: "01", title: "Interaction Ingestion", tool: "Pandas", description: "Processes 1.1M rating records across 270,000 book titles from the Book-Crossing dataset." },
      { step: "02", title: "Sparsity Filtering", tool: "NumPy", description: "Purges cold users (<200 ratings) and unpopular titles (<50 ratings) to reduce matrix sparsity to <3%." },
      { step: "03", title: "Similarity Matrix", tool: "Cosine Similarity / SVD", description: "Calculates dense N x N pairwise vector distances across latent user preference dimensions." },
      { step: "04", title: "Hybrid Engine", tool: "Python API", description: "Blends collaborative recommendations with content-based author/genre fallbacks for new users." },
      { step: "05", title: "Web Serving", tool: "Flask / REST API", description: "Serves top-K recommendations with book cover assets, ratings, and similarity confidence scores." },
    ],
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Matrix Sparsity Reduction & Cleansing",
        objective: "Filter extreme sparsity and harmonize ISBN metadata to create a dense rating matrix.",
        tech: ["Pandas", "NumPy", "Data Cleansing"],
        deliverables: [
          "Filtered users with >= 200 ratings and books with >= 50 ratings, condensing the pivot table.",
          "Resolved conflicting ISBN editions and cleaned corrupted character encoding.",
          "Transformed sparse interaction matrix into a memory-efficient representation.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Collaborative Filtering & Vector Space Modeling",
        objective: "Compute pairwise item similarity distances using Cosine Similarity and Matrix Factorization.",
        tech: ["Scikit-Learn", "Cosine Similarity", "SVD Factorization"],
        deliverables: [
          "Computed item-item similarity vectors across user affinity dimensions.",
          "Applied Singular Value Decomposition (SVD) for latent topic decomposition.",
          "Benchmarked recommendation precision and recall across test user holdouts.",
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "API Deployment & Cold-Start Solution",
        objective: "Expose real-time recommendation endpoints with metadata fallback mechanisms.",
        tech: ["Flask", "RESTful API", "HTML/Bootstrap"],
        deliverables: [
          "Built a sub-80ms latency endpoint returning top-5 recommendations with cover art.",
          "Implemented popularity and author-based fallback matching for unregistered user cold starts.",
          "Packaged application into clean reproducible deployment repo.",
        ],
      },
    ],
    keyResults: [
      "Achieved 86.4% Precision@5 on historical validation holdout datasets.",
      "Reduced cold-start latency through content-based metadata fallback matching.",
      "Delivered lightweight sub-80ms interactive web search experience.",
    ],
    codeSnippet: {
      language: "python",
      title: "Inference Engine: Top-K Cosine Similarity Lookups",
      code: `import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Compute Item-Item Similarity Matrix from dense pivot table
pt = ratings.pivot_table(index="Book-Title", columns="User-ID", values="Book-Rating").fillna(0)
similarity_scores = cosine_similarity(pt)

def recommend_books(book_name: str, top_k: int = 5):
    """Retrieve top_k highest cosine similarity book titles."""
    if book_name not in pt.index:
        return []
    index = np.where(pt.index == book_name)[0][0]
    similar_items = sorted(
        list(enumerate(similarity_scores[index])),
        key=lambda x: x[1],
        reverse=True
    )[1:top_k + 1]
    
    return [
        {"title": pt.index[i[0]], "similarity_score": round(float(i[1]), 4)}
        for i in similar_items
    ]`,
    },
  },
  {
    slug: "housing-valuation",
    title: "Real Estate Valuation & Pricing Model",
    subtitle: "Advanced Regression & Feature Engineering for Property Pricing",
    description:
      "End-to-end predictive modeling pipeline utilizing Ridge, Lasso, Random Forest, and LightGBM regressors to estimate residential property valuations with high precision.",
    tech: ["Python", "Pandas", "Scikit-Learn", "LightGBM", "XGBoost", "Feature Engineering"],
    repoUrl: "https://github.com/ShaunDataAnalytics/real-estate-valuation-ml",
    demoUrl: "https://github.com/ShaunDataAnalytics/real-estate-valuation-ml",
    category: "Machine Learning",
    projectGroup: "data",
    featured: true,
    quickHighlights: [
      "35+ Engineered Structural, Amenity, and Interaction Features",
      "Log-Transformed Target Distribution Mitigation",
      "10-Fold Cross-Validated Model Ensemble Comparison",
      "Interactive Pricing Estimator Web Calculator",
    ],
    metrics: [
      { label: "Test R² Score", value: "0.912" },
      { label: "RMSE Reduction", value: "-24.6%", change: "vs baseline" },
      { label: "Features Engineered", value: "35+ Features" },
      { label: "Cross-Validation Folds", value: "10 Folds" },
    ],
    problemStatement:
      "Accurate property valuation requires capturing complex, non-linear interactions between structural square footage, neighborhood amenities, quality grading, and seasonality trends. Linear models underperform due to severe price skew and collinearity.",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Exploratory Data Analysis & Target Engineering",
        objective: "Analyze feature correlations, resolve missingness, and normalize target distribution.",
        tech: ["Pandas", "Seaborn", "Log1p Transformation"],
        deliverables: [
          "Applied log1p transformation to sale price to eliminate severe right skew.",
          "Imputed missing structural variables using neighborhood median stratifications.",
          "Identified top predictive features (Overall Quality, Living Area, Garage Capacity).",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Feature Engineering & Dimensionality",
        objective: "Construct high-signal interaction terms and encode categorical features.",
        tech: ["Scikit-Learn", "Target Encoding", "Polynomial Features"],
        deliverables: [
          "Engineered 35+ domain features (Total Square Footage, Bath-to-Bed Ratio, Remodel Age).",
          "One-hot and target-encoded high cardinality neighborhood indicators.",
          "Eliminated multicollinear features using Variance Inflation Factor (VIF < 5.0).",
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Ensemble Modeling & Hyperparameter Optimization",
        objective: "Train, tune, and evaluate regularized linear, tree-based, and boosting regressors.",
        tech: ["Ridge / Lasso", "Random Forest", "LightGBM", "XGBoost", "Optuna"],
        deliverables: [
          "Tuned hyperparameters across 10-fold cross-validation with Optuna Bayesian search.",
          "XGBoost regressor achieved peak test R² of 0.912 and RMSE of 0.118.",
          "Generated SHAP value feature importance explanations for stakeholder transparency.",
        ],
      },
    ],
    keyResults: [
      "XGBoost regressor outperformed baseline linear regression by 24.6% RMSE reduction on held-out test data.",
      "Identified Overall Material Quality and Total SF as the two dominant pricing drivers via SHAP analysis.",
      "Delivered interactive pricing estimator widget for real-time scenario simulation.",
    ],
  },
  {
    slug: "tmdb-movie-analytics",
    title: "TMDB Box Office & Movie Revenue Analytics",
    subtitle: "Exploratory Data Analysis & Financial ROI Modeling on 10,000+ Film Records",
    description:
      "Comprehensive exploratory data analysis examining financial drivers, genre profitability, runtime trends, and director ROI metrics across decades of cinema history.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "EDA", "Statistical Testing"],
    repoUrl: "https://github.com/ShaunDataAnalytics/TMDB-Dataset",
    demoUrl: "https://github.com/ShaunDataAnalytics/TMDB-Dataset",
    category: "Data Analytics",
    projectGroup: "data",
    featured: true,
    quickHighlights: [
      "10,800+ Movie Financial Records Ingested & Cleaned",
      "CPI Inflation-Adjusted Budget & Revenue Transformations",
      "Genre Profitability Matrices & Director Return-on-Investment (ROI)",
      "Statistical Hypothesis Testing on Release Window Seasonality",
    ],
    metrics: [
      { label: "Films Analyzed", value: "10,800+" },
      { label: "Highest ROI Genre", value: "Animation / Sci-Fi" },
      { label: "Avg Profit Margin", value: "284%" },
      { label: "Decades Covered", value: "5 Decades" },
    ],
    problemStatement:
      "Film production studios face multi-million dollar greenlight decisions with high financial volatility. This analysis investigates historical box office data to identify ROI patterns, optimal runtime brackets, and genre release calendars.",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Data Ingestion & Inflation Adjustments",
        objective: "Standardize raw JSON attributes and normalize historical currencies for accurate financial comparison.",
        tech: ["Pandas", "CPI Index API", "Data Cleaning"],
        deliverables: [
          "Un-nested JSON genre, production company, and keyword arrays.",
          "Adjusted historical budgets and global box office returns using US CPI inflation indices.",
          "Filtered unreleased and promotional anomalies.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Exploratory Data Analysis & ROI Modeling",
        objective: "Uncover macro trends in budget allocation, runtime preferences, and genre profitability.",
        tech: ["Seaborn", "Matplotlib", "Statistical Hypothesis Testing"],
        deliverables: [
          "Computed genre-level ROI distributions revealing Animation & Sci-Fi as top risk-adjusted yielders.",
          "Proved statistically significant revenue boosts for films released during Memorial Day & Holiday windows.",
          "Constructed director track-record ranking matrices.",
        ],
      },
    ],
    keyResults: [
      "Identified that mid-budget films ($20M-$50M) in Horror and Sci-Fi yield the highest risk-adjusted ROI (340%).",
      "Quantified the box office multiplier effect of franchise IP versus standalone original screenplays.",
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
    category: "AI Systems",
    projectGroup: "ai",
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
  {
    slug: "powerbi-exam-studio",
    title: "Power BI PL-300 Diagnostic & Simulation Studio",
    subtitle: "Interactive 60-Question Sparring & Active Feynman Recall Engine",
    description:
      "A client-side interactive examination studio solving passive learning drop-off for Power BI analysts. Features real-time Study vs. Exam modes, DAX filter context trap diagnostics, and scoring analytics.",
    tech: ["JavaScript", "Tailwind CSS", "DAX", "Power BI", "Active Recall"],
    repoUrl: "https://github.com/ShaunDataAnalytics/ShaunDataAnalytics.github.io",
    demoUrl: "/demos/powerbi-studio/",
    category: "AI Systems",
    projectGroup: "ai",
    featured: true,
    quickHighlights: [
      "60-Question Curated PL-300 Diagnostic Problem Bank",
      "Instant Mode Toggling: Study Mode (Explanations) vs. Timed Exam Mode",
      "DAX Filter Context Trap Deconstruction & Socratic Sparring",
      "Zero-Backend Architecture: 100% Client-Side Scoring & Local State",
    ],
    metrics: [
      { label: "Question Bank", value: "60 Questions" },
      { label: "Exam Domains", value: "4 Modules" },
      { label: "Server Cost", value: "$0 (Static)" },
      { label: "Response Latency", value: "< 5ms" },
    ],
    problemStatement:
      "Traditional Power BI certification prep relies on static PDFs or expensive subscriptions with delayed feedback. Analysts frequently struggle to understand filter context transition bugs in DAX formulas without an interactive sparring interface.",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Pedagogical Schema & Question Bank Engineering",
        objective: "Structure real-world business scenarios testing data modeling, DAX measures, and report design.",
        tech: ["Feynman Technique", "DAX", "Data Modeling"],
        deliverables: [
          "Categorized 60 questions into Prepare, Model, Visualize, and Deploy domains.",
          "Penned granular trap explanations uncovering filter propagation pitfalls.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Zero-Latency Interactive Simulator Engine",
        objective: "Build a responsive, single-file simulation studio with live timing and scoring.",
        tech: ["HTML5", "Tailwind CSS", "Vanilla JS"],
        deliverables: [
          "Engineered instant answer verification, domain score tracking, and flag/review workflow.",
          "Delivered sub-5ms client-side interaction speed with zero server dependency.",
        ],
      },
    ],
    keyResults: [
      "Transformed dry certification memorization into an active Feynman diagnostics studio.",
      "Provided free, zero-friction access for data analysts to master complex DAX concepts.",
    ],
  },
  {
    slug: "bilingual-neural-audiobook",
    title: "Bilingual Neural Audiobook & Socratic Reader",
    subtitle: "Multi-Language Speechify-Style Knowledge Engine with Active Recall",
    description:
      "Dual-language neural voice player solving screen fatigue and commute retention loss. Combines Edge-TTS high-fidelity models (en-US / zh-CN) with in-player Socratic oral recall drills.",
    tech: ["Web Audio API", "Edge-TTS", "Python", "Tailwind CSS", "Socratic Sparring"],
    repoUrl: "https://github.com/ShaunDataAnalytics/ShaunDataAnalytics.github.io",
    category: "AI Systems",
    projectGroup: "ai",
    featured: true,
    quickHighlights: [
      "Bilingual Streaming: English (Four Thousand Weeks) & Chinese (终身学习)",
      "Microsoft Edge-TTS High-Fidelity Neural Speech Synthesis",
      "In-Player Socratic Recall Drills Grounding Book Concepts",
      "Custom Scrubbing, Playback Speed (0.8x-2.0x), and Audio Waveforms",
    ],
    metrics: [
      { label: "Retention Boost", value: "10% ➔ 80%" },
      { label: "Languages", value: "EN & ZH" },
      { label: "Audio Streaming", value: "Zero-CORS" },
      { label: "Hosting Cost", value: "$0" },
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
    slug: "career-pulse-quiz",
    title: "Career Pulse · Career Anxiety & Persona Quiz",
    subtitle: "Interactive Behavioral Diagnostic Engine & 80/20 Actionable Breakthrough Lab",
    description:
      "A mobile-first behavioral assessment and diagnostic tool helping job seekers identify hidden psychological bottlenecks (imposter syndrome, resume perfectionism paralysis, spray-and-pray burnout). Features real-time state machines, 1080x1440 HD canvas shareable poster export, and zero-cost client-side scoring.",
    tech: ["JavaScript", "HTML5 Canvas", "Pico CSS", "State Machine", "QRCode.js", "Local-First"],
    repoUrl: "https://github.com/ShaunDataAnalytics/career-pulse-quiz",
    demoUrl: "https://shaundataanalytics.github.io/career-pulse-quiz/",
    category: "AI Systems",
    projectGroup: "ai",
    featured: true,
    quickHighlights: [
      "6 Immersive Scenario Questions Diagnosing Job Search Friction & Inaction",
      "4 Granular Psychological Archetypes with Actionable 80/20 Breakthrough Playbooks",
      "High-Performance HTML5 Canvas Rendering 1080x1440 Shareable Social Posters",
      "100% Client-Side Local State Machine: Zero Server Dependency, Zero Cloud Cost",
    ],
    metrics: [
      { label: "Diagnostic Scenarios", value: "6 Questions" },
      { label: "Persona Archetypes", value: "4 Archetypes" },
      { label: "Poster Generation", value: "1080x1440 HD" },
      { label: "Client Latency", value: "< 10ms" },
    ],
    problemStatement:
      "Job seekers frequently face severe emotional exhaustion, imposter syndrome, and analysis paralysis during prolonged search cycles. Most career advice prescribes generic resume updates or endless application volume, treating surface symptoms rather than the root psychological blockers (e.g. over-preparation vs. fear of rejection). Career Pulse provides an instant, interactive behavioral diagnostic that categorizes distinct inertia archetypes and offers concrete 80/20 micro-protocols.",
    architectureFlow: [
      { step: "01", title: "Scenario Diagnostics", tool: "Vanilla JS / DOM", description: "Presents 6 high-resonance situational dilemmas across application, interview, and follow-up stages." },
      { step: "02", title: "State Machine Engine", tool: "Local State / Storage", description: "Tracks multi-dimensional user choice vectors with seamless back-navigation and state persistence." },
      { step: "03", title: "Archetype Scoring", tool: "Scoring Algorithm", description: "Evaluates dominant response patterns to map users into 1 of 4 tailored behavioral personas." },
      { step: "04", title: "HD Canvas Generation", tool: "HTML5 Canvas API", description: "Renders branded 1080x1440 high-density social posters with custom text typography and QR code." },
      { step: "05", title: "Actionable Conversion", tool: "Community / Form", description: "Guides users into supportive community cohorts and structured 1-on-1 coaching workflows." },
    ],
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Pedagogical Persona & Question Design",
        objective: "Structure high-resonance job seeker dilemmas and map 4 distinct inertia archetypes.",
        tech: ["Behavioral Psychology", "Persona Mapping", "SCQA"],
        deliverables: [
          "Developed 6 situational questions testing delivery confidence, rejection reaction, and daily routines.",
          "Profiled 4 core archetypes: 全装仓鼠型, 地毯扫射型, 高敏占卜型, and 深水隐忍型.",
          "Formulated targeted 80/20 cognitive de-escalation protocols for each profile.",
        ],
      },
      {
        phaseNumber: 2,
        phaseName: "Lightweight Zero-Dependency UI Architecture",
        objective: "Build an ultra-responsive, mobile-first single-page app with fluid state management.",
        tech: ["HTML5", "Pico CSS", "Vanilla JavaScript"],
        deliverables: [
          "Engineered interactive progress bar, smooth transition animations, and instantaneous option feedback.",
          "Implemented local storage caching to preserve user progress across accidental page refreshes.",
          "Zero build step requirement: 100% vanilla browser execution with sub-10ms response times.",
        ],
      },
      {
        phaseNumber: 3,
        phaseName: "Canvas Poster Generation & Mobile Ergonomics",
        objective: "Enable 1-click viral sharing via client-side high-resolution poster compilation.",
        tech: ["HTML5 Canvas", "QRCode.js", "Blob API"],
        deliverables: [
          "Engineered 1080x1440 portrait poster renderer with dynamic text wrapping and color gradients.",
          "Integrated on-the-fly QR code generation for effortless peer sharing in mobile browsers.",
          "Provided native long-press save and copy-to-clipboard invitation templates.",
        ],
      },
    ],
    keyResults: [
      "Sub-10ms instant response time across mobile and desktop devices with zero server operating cost.",
      "Delivered native 1080x1440 mobile poster generator with dynamic SVG/Canvas QR composition.",
      "Equipped job seekers with actionable clarity, dismantling imposter syndrome into high-leverage micro-actions.",
    ],
    codeSnippet: {
      language: "javascript",
      title: "Client-Side 1080x1440 HD Poster Canvas Renderer",
      code: `// Dynamic 1080x1440 Canvas Social Poster Generator
function generatePoster(result, answers) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  
  // Render Background Gradient & Card Frames
  drawBackground(ctx, 1080, 1440);
  
  // Render Result Persona Title & 80/20 Breakthrough Rule
  ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillStyle = '#0f172a';
  ctx.fillText(result.personaName, 80, 240);
  
  // Wrap and render personalized psychological diagnosis
  wrapText(ctx, result.diagnosisText, 80, 360, 920, 48);
  
  // Composite Dynamic QR Code onto canvas for viral social sharing
  QRCode.toCanvas(qrContainer, result.shareUrl, { width: 160 }, (err, qrCanvas) => {
    ctx.drawImage(qrCanvas, 840, 1200, 160, 160);
  });
  return canvas.toDataURL('image/png');
}`,
    },
  },
];
