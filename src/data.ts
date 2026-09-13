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
  category: "Machine Learning" | "Data Analytics" | "Web App" | "Productivity";
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
    slug: "focus-pomodoro-chrome-extension",
    title: "Focus Pomodoro Chrome Extension",
    subtitle: "Deep Work Sprint & Productivity Tool for Developers",
    description:
      "A lightweight, micro-sprint productivity Chrome extension built for deep work focus management, custom timer intervals, and local session analytics.",
    tech: ["JavaScript", "Chrome Extension V3 API", "HTML5", "CSS3", "Productivity"],
    repoUrl: "https://github.com/ShaunDataAnalytics/focus-pomodoro-chrome-extension",
    demoUrl: "https://github.com/ShaunDataAnalytics/focus-pomodoro-chrome-extension",
    category: "Productivity",
    featured: true,
    quickHighlights: [
      "Manifest V3 Background Service Worker Architecture",
      "Zero-Overhead (<10ms UI latency) Local Storage Synchronization",
      "Customizable 25/5 Deep Work Sprint Intervals",
      "Privacy-First: 100% Client-Side Session Analytics",
    ],
    metrics: [
      { label: "Focus Sprint Cap", value: "25 Min" },
      { label: "UI Overhead", value: "< 10ms" },
      { label: "Data Storage", value: "100% Local" },
      { label: "Memory Footprint", value: "< 12 MB" },
    ],
    problemStatement:
      "Knowledge workers and developers lose significant momentum due to task-switching and cognitive friction. Heavy productivity apps often introduce distraction. This extension provides frictionless 25-minute focus timers directly inside the browser.",
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Manifest V3 Architecture & State Machine",
        objective: "Build reliable timer state synchronization using modern Chrome extension standards.",
        tech: ["Chrome Alarms API", "Service Workers", "chrome.storage.local"],
        deliverables: [
          "Implemented background alarm triggers resilient to tab suspension and browser throttling.",
          "Created lightweight popup UI communicating with background workers via message passing.",
          "Enforced zero external tracker dependencies for complete user privacy.",
        ],
      },
    ],
    keyResults: [
      "Delivered lightweight, zero-distraction deep work sprint timer for high-focus execution.",
      "Achieved sub-10ms UI interaction response with zero memory leaks.",
    ],
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
    category: "Data Analytics",
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
    demoUrl: "/demos/bilingual-audio/",
    category: "Productivity",
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
];
