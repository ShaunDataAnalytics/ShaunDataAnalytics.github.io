export type Project = {
  title: string;
  description: string;
  tech: string[];
  repoUrl: string;
  imageUrl: string;
};

export const projects: Project[] = [
  {
    title: "Life Balance Dashboard",
    description:
      "A web-based dashboard to visualize and track life balance across work, health, and personal goals.",
    tech: ["JavaScript", "Data Visualization", "Frontend"],
    repoUrl: "https://github.com/ShaunDataAnalytics/life-balance-dashboard",
    imageUrl: "/images/placeholder.svg",
  },
  {
    title: "Pomodoro Productivity Extension",
    description:
      "A browser extension that uses the Pomodoro technique to help you stay focused and productive.",
    tech: ["JavaScript", "Chrome Extension", "Productivity"],
    repoUrl: "https://github.com/ShaunDataAnalytics/pomodoro-productivity-extension",
    imageUrl: "/images/placeholder.svg",
  },
  {
    title: "TMDB Movie Analytics",
    description:
      "Exploratory data analysis of the TMDB movie dataset to surface insights about revenue, ratings, and genres.",
    tech: ["Python", "Pandas", "Data Visualization"],
    repoUrl: "https://github.com/ShaunDataAnalytics/TMDB-Dataset",
    imageUrl: "/images/placeholder.svg",
  },
  {
    title: "Book Recommender System",
    description:
      "A collaborative filtering-based recommender that suggests books based on user-item interactions.",
    tech: ["Python", "Recommendation Systems", "Jupyter Notebook"],
    repoUrl: "https://github.com/ShaunDataAnalytics/CapstoneP-Book-Recommender",
    imageUrl: "/images/placeholder.svg",
  },
];

