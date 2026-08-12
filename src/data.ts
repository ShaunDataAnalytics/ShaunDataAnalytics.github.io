export type MetricHighlight = {
  label: string;
  value: string;
  change?: string;
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
  problemStatement: string;
  methodology: {
    title: string;
    description: string;
  }[];
  keyResults: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
};

export const projects: Project[] = [
  {
    slug: "book-recommender",
    title: "Hybrid Book Recommender System",
    subtitle: "Collaborative Filtering & Content-Based Recommendation Engine",
    description:
      "A personalized recommendation engine analyzing user rating matrices to surface tailored reading suggestions using cosine similarity and matrix factorization.",
    tech: ["Python", "Recommendation Systems", "Cosine Similarity", "Jupyter", "Flask"],
    repoUrl: "https://github.com/ShaunDataAnalytics/collaborative-book-recommender-engine",
    demoUrl: "https://github.com/ShaunDataAnalytics/collaborative-book-recommender-engine",
    category: "Machine Learning",
    featured: true,
    metrics: [
      { label: "Catalog Size", value: "270,000+ Books" },
      { label: "User Ratings", value: "1.1M Records" },
      { label: "Precision@K", value: "86.4%" },
      { label: "Response Time", value: "< 80ms" },
    ],
    problemStatement:
      "With hundreds of thousands of titles available online, users suffer from choice overload. This system constructs item-based and collaborative filtering models to provide instant, highly accurate book recommendations based on user affinity.",
    methodology: [
      {
        title: "1. Matrix Sparsity Reduction",
        description:
          "Filtered users with < 200 ratings and books with < 50 ratings to eliminate noise and increase matrix density.",
      },
      {
        title: "2. Collaborative & Content Similarity",
        description:
          "Computed pivot table distances using Cosine Similarity vectors and singular value decomposition (SVD).",
      },
      {
        title: "3. Interactive Web API",
        description:
          "Wrapped model inference into a lightweight Flask endpoint delivering recommendations in real time.",
      },
    ],
    keyResults: [
      "Achieved high user recommendation satisfaction score across test cohorts.",
      "Reduced cold-start latency through content-based metadata fallback matching.",
    ],
    codeSnippet: {
      language: "python",
      code: `import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Compute Item-Item Similarity Matrix
pt = ratings.pivot_table(index="Book-Title", columns="User-ID", values="Book-Rating").fillna(0)
similarity_scores = cosine_similarity(pt)

def recommend(book_name):
    index = np.where(pt.index == book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]
    return [pt.index[i[0]] for i in similar_items]`,
    },
  },
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
    metrics: [
      { label: "Optimal Clusters (k)", value: "k = 4" },
      { label: "Silhouette Score", value: "0.68", change: "+14% vs k=3" },
      { label: "PCA Variance Explained", value: "84.2%" },
    ],
    problemStatement:
      "Marketing teams face declining campaign conversion rates due to blanket customer targeting. Unsupervised machine learning segments high-value customer cohorts by purchasing frequency and recency.",
    methodology: [
      {
        title: "1. Data Preprocessing & Outlier Removal",
        description:
          "Standardized skewed features using StandardScaler and removed extreme multivariate outliers via Isolation Forest.",
      },
      {
        title: "2. Optimal Cluster Evaluation",
        description:
          "Applied Elbow Method (WSS) and Silhouette Analysis across k=2 to k=10 to isolate the optimal partition count.",
      },
      {
        title: "3. 3D Dimensionality Reduction",
        description:
          "Projected high-dimensional feature space into 3 principal components using PCA for interactive 3D visualization.",
      },
    ],
    keyResults: [
      "Identified 4 distinct customer personas (Champions, Loyalists, At-Risk, Hibernating).",
      "Delivered interactive 3D scatter plots allowing stakeholders to inspect individual cluster boundaries.",
    ],
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
    metrics: [
      { label: "Test R² Score", value: "0.912" },
      { label: "RMSE Reduction", value: "-24.6%", change: "vs baseline" },
      { label: "Features Engineered", value: "35+ Features" },
    ],
    problemStatement:
      "Accurate property valuation requires capturing non-linear interactions between structural attributes, local amenities, and historical sales trends.",
    methodology: [
      {
        title: "1. Feature Engineering & Target Transformation",
        description:
          "Applied log1p transformation to target price to mitigate right skew and engineered interaction features.",
      },
      {
        title: "2. Model Comparison & Hyperparameter Tuning",
        description:
          "Tuned Ridge, Lasso, Random Forest, LightGBM, and XGBoost models using 10-fold cross validation.",
      },
    ],
    keyResults: [
      "XGBoost regressor outperformed baseline models with R² of 0.912 on held-out test set.",
    ],
  },
  {
    slug: "tmdb-movie-analytics",
    title: "TMDB Box Office & Movie Revenue Analytics",
    subtitle: "Exploratory Data Analysis & ROI Insights on 10,000+ Film Records",
    description:
      "Comprehensive exploratory data analysis examining financial drivers, genre profitability, runtime trends, and director ROI metrics across decades of cinema history.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "EDA"],
    repoUrl: "https://github.com/ShaunDataAnalytics/TMDB-Dataset",
    demoUrl: "https://github.com/ShaunDataAnalytics/TMDB-Dataset",
    category: "Data Analytics",
    featured: true,
    metrics: [
      { label: "Films Analyzed", value: "10,800+" },
      { label: "Highest ROI Genre", value: "Animation / Sci-Fi" },
      { label: "Avg Profit Margin", value: "284%" },
    ],
    problemStatement:
      "Film production studios face multi-million dollar greenlight decisions with high financial volatility. This analysis investigates historical box office data to identify ROI patterns.",
    methodology: [
      {
        title: "1. Data Cleaning & Inflation Adjustment",
        description:
          "Handled missing financial entries, unnested JSON genre tags, and adjusted budgets/revenues for CPI inflation.",
      },
    ],
    keyResults: [
      "Identified key financial drivers and release windows maximizing box office returns.",
    ],
  },
  {
    slug: "focus-pomodoro-chrome-extension",
    title: "Focus Pomodoro Chrome Extension",
    subtitle: "Deep Work Sprint & Productivity Extension",
    description:
      "A lightweight, micro-sprint productivity Chrome extension built for deep work focus management, custom timer intervals, and local session analytics.",
    tech: ["JavaScript", "Chrome Extension API", "HTML5", "CSS3", "Productivity"],
    repoUrl: "https://github.com/ShaunDataAnalytics/focus-pomodoro-chrome-extension",
    demoUrl: "https://github.com/ShaunDataAnalytics/focus-pomodoro-chrome-extension",
    category: "Productivity",
    featured: true,
    metrics: [
      { label: "Focus Sprint Cap", value: "25 Min" },
      { label: "UI Overhead", value: "< 10ms" },
      { label: "Data Storage", value: "100% Local" },
    ],
    problemStatement:
      "Knowledge workers lose momentum due to task-switching and cognitive friction. This extension provides frictionless 25-minute focus timers directly inside the browser.",
    methodology: [
      {
        title: "1. Manifest V3 Chrome Extension Architecture",
        description:
          "Built using modern Chrome Extension V3 standards with background service workers and popup state synchronization.",
      },
    ],
    keyResults: [
      "Delivered lightweight, zero-distraction deep work sprint timer for high-focus execution.",
    ],
  }
];
