import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import TechStackGrid from "@/components/TechStackGrid";
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

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Hero />
        <TechStackGrid />

        <section id="projects" className="py-16 scroll-mt-24">
          <div className="mb-12 text-center">
            <span className="rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              Selected Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Featured Case Studies & Projects
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
              Explore in-depth technical breakdowns, algorithms, and interactive live simulations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projectsWithStars.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        © {new Date().getFullYear()} Shaun Lin • Powered by Next.js & GitHub Pages
      </footer>
    </div>
  );
}
