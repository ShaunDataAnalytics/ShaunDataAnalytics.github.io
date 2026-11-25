import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TechStackGrid from "@/components/TechStackGrid";
import CareerTimeline from "@/components/CareerTimeline";
import ProjectSection from "@/components/ProjectSection";
import { projects } from "@/data";

async function fetchStars(repoUrl: string): Promise<number | null> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\/|$)/);
  if (!match) return null;
  const [, owner, repo] = match;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : undefined,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const projectsWithStars = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      stars: await fetchStars(project.repoUrl),
    }))
  );

  const aiProjects = projectsWithStars.filter((p) => p.projectGroup === "ai");
  const dataProjects = projectsWithStars.filter((p) => p.projectGroup === "data");

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Hero />
        <TechStackGrid />
        <CareerTimeline />

        {/* Anchor for Hero button */}
        <div id="projects" className="scroll-mt-24" />

        {/* 1. AI USE CASES & INTERACTIVE DEMOS */}
        <ProjectSection
          id="ai-projects"
          badge="AI Systems & Interactive Labs"
          badgeColor="cyan"
          title="🤖 AI Use Cases & Interactive Demos"
          description="Autonomous incident triage with precedent citation guardrails, neural speech pipelines, and active Socratic recall engines."
          projects={aiProjects}
          initialCount={2}
        />

        {/* 2. DATA ANALYTICS & MACHINE LEARNING PROJECTS */}
        <ProjectSection
          id="data-projects"
          badge="Analytics Engineering & ML"
          badgeColor="indigo"
          title="📊 Data Analytics & Machine Learning Projects"
          description="Production Kimball dimensional modeling, automated ETL integrity reconciliation, and interactive analytical studios."
          projects={dataProjects}
          initialCount={2}
        />
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        © {new Date().getFullYear()} Shaun Lin • Powered by Next.js & GitHub Pages
      </footer>
    </div>
  );
}
