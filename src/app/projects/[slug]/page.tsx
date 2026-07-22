import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, ExternalLink, Github, Sparkles, TrendingUp } from "lucide-react";
import { projects } from "@/data";
import Navbar from "@/components/Navbar";
import ClusterVisualizer from "@/components/ClusterVisualizer";
import HousingEstimator from "@/components/HousingEstimator";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 pb-24">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back to All Projects
        </Link>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              {project.category}
            </span>
            <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Case Study & Technical Showcase
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              <Github size={18} />
              View Source Code on GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-600 transition-colors hover:bg-cyan-500/20 dark:text-cyan-400"
              >
                <ExternalLink size={18} />
                Try Interactive App
              </a>
            )}
          </div>
        </header>

        {/* Tech Stack Badges */}
        <div className="mb-10 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* KPI Metrics Grid */}
        <section className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{m.label}</p>
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{m.value}</p>
              {m.change && (
                <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingUp size={12} />
                  {m.change}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Interactive Visualizer Section */}
        {project.slug === "clustering-analytics" && (
          <section className="mb-14">
            <ClusterVisualizer />
          </section>
        )}
        {project.slug === "housing-price-prediction" && (
          <section className="mb-14">
            <HousingEstimator />
          </section>
        )}

        {/* Problem Statement */}
        <section className="mb-12 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            <Sparkles className="text-cyan-500" size={20} />
            Problem Statement & Objectives
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </section>

        {/* Methodology Breakdown */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Technical Methodology & Pipeline
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.methodology.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Snippet */}
        {project.codeSnippet && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              <Code2 className="text-cyan-500" size={20} />
              Core Implementation Snippet ({project.codeSnippet.language})
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-200 font-mono shadow-xl">
              <pre>
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Key Results */}
        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 dark:bg-emerald-950/20">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Key Findings & Business Impact
          </h2>
          <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {project.keyResults.map((result, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
