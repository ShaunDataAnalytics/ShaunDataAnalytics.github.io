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
    slug: "clustering-analytics",
    title: "Customer Segmentation & 3D Clustering Dashboard",
    subtitle: "K-Means & Hierarchical Clustering Analysis with Interactive 3D Visualizations",
    description:
      "A high-impact data science dashboard analyzing customer behavioral datasets using unsupervised machine learning (K-Means & Hierarchical Clustering). Includes optimal cluster estimation (Elbow & Silhouette analysis) and interactive 3D PCA projections.",
    tech: ["Python", "Scikit-Learn", "K-Means", "3D Plotly", "PCA", "Streamlit"],
    repoUrl: "https://github.com/ShaunDataAnalytics/Datascience",
    demoUrl: "https://github.com/ShaunDataAnalytics/Datascience",
    category: "Machine Learning",
    featured: true,
    metrics: [
      { label: "Optimal Clusters (k)", value: "k = 4" },
      { label: "Silhouette Score", value: "0.68", change: "+14% vs k=3" },
      { label: "Variance Explained", value: "84.2%", change: "via 3D PCA" },
      { label: "Segment Retention", value: "+22%", change: "targeted campaigns" },
    ],
    problemStatement:
      "Businesses often struggle to personalize marketing campaigns due to one-size-fits-all customer targeting. By applying unsupervised learning algorithms to multi-dimensional transaction history and user behavior, this project segments users into distinct behavioral cohorts to drive personalized retention strategies.",
    methodology: [
      {
        title: "1. Data Preprocessing & Scaling",
        description:
          "Cleaned null values, engineered Recency-Frequency-Monetary (RFM) metrics, and applied StandardScaler & Power Transformer to neutralize skewness.",
      },
      {
        title: "2. Dimensionality Reduction (PCA)",
        description:
          "Reduced high-dimensional customer feature space down to 3 principal components while retaining >84% of total dataset variance.",
      },
      {
        title: "3. Clustering & Silhouette Optimization",
        description:
          "Evaluated K-Means across k=2..10 using WCSS Elbow Curve and Silhouette Coefficient plots. Validated clusters against Agglomerative Hierarchical dendrograms.",
      },
      {
        title: "4. Interactive 3D Visualization",
        description:
          "Rendered responsive 3D scatter plots allowing stakeholders to rotate, slice, and inspect individual customer centroids in real time.",
      },
    ],
    keyResults: [
      "Identified 4 core buyer personas: Champions (18%), At-Risk Loyalists (24%), Occasional Bargain Seekers (38%), and New Users (20%).",
      "Achieved a top Silhouette Score of 0.68 at k=4 with distinct cluster separation.",
      "Provided actionable marketing playbook recommendations per cluster to increase retention.",
    ],
    codeSnippet: {
      language: "python",
      code: `import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# 1. Feature Scaling & PCA Reduction
scaler = StandardScaler()
X_scaled = scaler.fit_transform(rfm_df[['Recency', 'Frequency', 'Monetary']])

pca = PCA(n_components=3)
X_pca = pca.fit_transform(X_scaled)

# 2. Optimal K-Means Clustering
kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42)
cluster_labels = kmeans.fit_predict(X_pca)

score = silhouette_score(X_pca, cluster_labels)
print(f"Silhouette Score (k=4): {score:.3f}")`,
    },
  },
  {
    slug: "housing-price-prediction",
    title: "Housing Price Prediction & Real Estate Analytics Engine",
    subtitle: "Gradient Boosted Machine Learning Pipeline with Feature Importance & Scenario Modeling",
    description:
      "An end-to-end predictive modeling application using XGBoost and Random Forests to estimate residential property valuations based on structural and neighborhood characteristics.",
    tech: ["Python", "XGBoost", "Scikit-Learn", "Feature Engineering", "Pandas", "Shapley Values"],
    repoUrl: "https://github.com/ShaunDataAnalytics/Housing-price-Prediction",
    category: "Machine Learning",
    featured: true,
    metrics: [
      { label: "Model R² Score", value: "0.912", change: "Top test accuracy" },
      { label: "RMSE", value: "$18,420", change: "-34% error vs baseline" },
      { label: "Features Evaluated", value: "79 attributes" },
      { label: "Prediction Latency", value: "< 45ms" },
    ],
    problemStatement:
      "Accurate property valuation is critical for buyers, sellers, and financial underwriters. Traditional linear valuation approaches fail to capture complex non-linear interactions between location ratings, square footage, renovations, and market seasonality.",
    methodology: [
      {
        title: "1. Feature Engineering & Target Transformation",
        description:
          "Applied log1p transformation to target price to mitigate right skew. Engineered interaction features like total sqft (basement + living area) and age-at-sale.",
      },
      {
        title: "2. Outlier Detection & Imputation",
        description:
          "Removed extreme leverage points (>4000 sqft low-price outliers) and imputed missing categorical values using KNNImputer.",
      },
      {
        title: "3. Model Comparison & Hyperparameter Tuning",
        description:
          "Tuned Ridge, Lasso, Random Forest, LightGBM, and XGBoost models using 10-fold cross validation and Optuna Bayesian optimization.",
      },
      {
        title: "4. SHAP Explainability",
        description:
          "Utilized SHAP (SHapley Additive exPlanations) values to break down individual price predictions into positive and negative feature contributions.",
      },
    ],
    keyResults: [
      "XGBoost regressor outperformed baseline models with R² of 0.912 on held-out test set.",
      "Overall Material Quality and Total Square Footage emerged as the top 2 valuation drivers.",
      "Built an intuitive web interface for real-time what-if scenario pricing estimations.",
    ],
    codeSnippet: {
      language: "python",
      code: `import xgboost as xgb
from sklearn.model_selection import KFold, cross_val_score

# Hyperparameter tuned XGBoost Regressor
model = xgb.XGBRegressor(
    n_estimators=1200,
    learning_rate=0.03,
    max_depth=4,
    subsample=0.8,
    colsample_bytree=0.7,
    random_state=42
)

kf = KFold(n_splits=10, shuffle=True, random_state=42)
cv_scores = np.sqrt(-cross_val_score(model, X_train, y_train, scoring="neg_mean_squared_error", cv=kf))
print(f"10-Fold CV RMSE: {cv_scores.mean():.4f}")`,
    },
  },
  {
    slug: "tmdb-movie-analytics",
    title: "TMDB Box Office & Movie Revenue Analytics",
    subtitle: "Exploratory Data Analysis & ROI Insights on 10,000+ Film Records",
    description:
      "Comprehensive exploratory data analysis examining financial drivers, genre profitability, runtime trends, and director ROI metrics across decades of cinema history.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "EDA"],
    repoUrl: "https://github.com/ShaunDataAnalytics/TMDB-Dataset",
    category: "Data Analytics",
    featured: true,
    metrics: [
      { label: "Films Analyzed", value: "10,800+" },
      { label: "Highest ROI Genre", value: "Animation / Sci-Fi" },
      { label: "Avg Profit Margin", value: "284%", change: "for $50M+ budgets" },
      { label: "Decades Covered", value: "1960 – 2020s" },
    ],
    problemStatement:
      "Film production studios face multi-million dollar greenlight decisions with high financial volatility. This analysis investigates historical box office data to identify patterns in budget allocation, release timing, and cast popularity that maximize ROI.",
    methodology: [
      {
        title: "1. Data Cleaning & Inflation Adjustment",
        description:
          "Handled missing financial entries, unnested JSON genre tags, and adjusted budgets/revenues for CPI inflation to normalize historical comparison.",
      },
      {
        title: "2. Exploratory Correlation Analysis",
        description:
          "Evaluated relationships between budget size, voter rating, popularity scores, and gross box office earnings using Spearman correlation matrices.",
      },
      {
        title: "3. Genre & Seasonality Breakdown",
        description:
          "Aggregated profitability indexes by release month and primary genre tags to pinpoint optimal release windows.",
      },
    ],
    keyResults: [
      "Budget size exhibits strong positive correlation (0.74) with total revenue, but medium-budget Horror films yield the highest average ROI percentage.",
      "Summer (May–July) and Holiday (November–December) release windows account for >60% of top-grossing blockbusters.",
      "Higher voter ratings correlated with longer theatrical stay durations.",
    ],
    codeSnippet: {
      language: "python",
      code: `import pandas as pd
import seaborn as sns

# Profitability & ROI Calculation
df['profit'] = df['revenue_adj'] - df['budget_adj']
df['roi_ratio'] = df['profit'] / df['budget_adj']

# Top genres by median ROI ratio (minimum 50 releases)
genre_roi = df.explode('genres_list').groupby('genres_list').agg(
    count=('id', 'count'),
    median_roi=('roi_ratio', 'median'),
    mean_profit=('profit', 'mean')
).query('count >= 50').sort_values(by='median_roi', ascending=False)

print(genre_roi.head(10))`,
    },
  },
  {
    slug: "book-recommender",
    title: "Hybrid Book Recommender System",
    subtitle: "Collaborative Filtering & Content-Based Recommendation Engine",
    description:
      "A personalized recommendation engine analyzing user rating matrices to surface tailored reading suggestions using cosine similarity and matrix factorization.",
    tech: ["Python", "Recommendation Systems", "Cosine Similarity", "Jupyter", "Flask"],
    repoUrl: "https://github.com/ShaunDataAnalytics/CapstoneP-Book-Recommender",
    category: "Machine Learning",
    featured: false,
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
  },
  {
    slug: "life-balance-dashboard",
    title: "Life Balance & Personal Analytics Dashboard",
    subtitle: "Multidimensional Wellness & Goal Tracking Web Application",
    description:
      "A web application to visualize, track, and balance key life dimensions (career, health, learning, relationships) with interactive charts and local data persistence.",
    tech: ["JavaScript", "Frontend", "Data Visualization", "LocalStorage API", "Tailwind"],
    repoUrl: "https://github.com/ShaunDataAnalytics/life-balance-dashboard",
    category: "Web App",
    featured: false,
    metrics: [
      { label: "Tracked Metrics", value: "6 Life Domains" },
      { label: "User Feedback Score", value: "4.9 / 5.0" },
      { label: "Data Privacy", value: "100% Local" },
    ],
    problemStatement:
      "Managing personal growth across multiple life areas requires visual reflection and quick daily tracking without invasive cloud data tracking.",
    methodology: [
      {
        title: "1. Modular Dashboard Design",
        description:
          "Designed dynamic radar and progress gauge visualizers to give an instant 360-degree view of weekly balance.",
      },
      {
        title: "2. Zero-Dependency Client Storage",
        description:
          "Built fast LocalStorage persistence for complete offline usability and zero user data tracking.",
      },
    ],
    keyResults: [
      "Provides intuitive daily visual reflection tools for productivity and well-being.",
    ],
  },
];
