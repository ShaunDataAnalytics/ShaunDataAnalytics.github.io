import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import TechStackGrid from "@/components/TechStackGrid";
import ThemeToggle from "@/components/ThemeToggle";
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
      <header className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Hero />
        <TechStackGrid />
        <section className="py-12">
          <h2 className="mb-10 text-center text-2xl font-semibold text-zinc-800 dark:text-zinc-200 sm:text-3xl">
            Projects
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projectsWithStars.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
