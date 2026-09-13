import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Github,
  KeyRound,
  Layers,
  Sparkles,
  Table2,
  TrendingUp,
  Workflow,
} from "lucide-react";
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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 pb-28">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-10">
        {/* Navigation Breadcrumb */}
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back to All Projects & Case Studies
        </Link>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              {project.category}
            </span>
            <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Production Engineering Case Study
            </span>
            {project.schemas && (
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 flex items-center gap-1">
                <Database size={13} />
                Kimball / Relational Schema
              </span>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight">
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
              View Source Repository on GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-600 transition-colors hover:bg-cyan-500/20 dark:text-cyan-400"
              >
                <ExternalLink size={18} />
                Live Demo / Interactive App ↗
              </a>
            )}
          </div>
        </header>

        {/* Tech Stack Badges */}
        <div className="mb-10 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
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
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">{m.label}</p>
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{m.value}</p>
              {m.change && (
                <p className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingUp size={12} />
                  {m.change}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Interactive Visualizer Section (3D Clustering / Estimator) */}
        {project.slug === "clustering-analytics" && (
          <section className="mb-14">
            <ClusterVisualizer />
          </section>
        )}
        {project.slug === "housing-valuation" && (
          <section className="mb-14">
            <HousingEstimator />
          </section>
        )}

        {/* 1. Problem Statement & Business Context */}
        <section className="mb-12 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            <Sparkles className="text-cyan-500" size={20} />
            1. Problem Statement & Business Objective
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
            {project.problemStatement}
          </p>
        </section>

        {/* 2. End-to-End Architecture Flow (Yanna Style Flowchart) */}
        {project.architectureFlow && project.architectureFlow.length > 0 && (
          <section className="mb-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                <Workflow className="text-cyan-500" size={24} />
                End-to-End Pipeline & System Architecture
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {project.architectureFlow.map((node) => (
                <div
                  key={node.step}
                  className="relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-cyan-500/40 dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-black text-cyan-600 dark:text-cyan-400">
                        STAGE {node.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      {node.title}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
                      {node.tool}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Phase-by-Phase Engineering Deep Dive (5-Phase Lifecycle) */}
        {project.phases && project.phases.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
              <Layers className="text-cyan-500" size={24} />
              Phase-by-Phase Engineering Lifecycle
            </h2>

            <div className="space-y-6">
              {project.phases.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-xs font-black text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {phase.phaseNumber}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        Phase {phase.phaseNumber}: {phase.phaseName}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-800 dark:text-zinc-200">Objective:</strong>{" "}
                    {phase.objective}
                  </p>

                  <div className="mb-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Key Deliverables & Implementations
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                      {phase.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-cyan-500" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {phase.keyInsight && (
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5 text-xs text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-950/20 dark:text-cyan-300">
                      <strong>💡 Architectural Insight:</strong> {phase.keyInsight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Table Schema & Data Modeling Cards */}
        {project.schemas && project.schemas.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
              <Table2 className="text-indigo-500" size={24} />
              Dimensional Schema & Table Definitions
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {project.schemas.map((schema) => (
                <div
                  key={schema.tableName}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {schema.tableName}
                    </span>
                    <span className="rounded-md bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {schema.tableType}
                    </span>
                  </div>

                  <p className="mb-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <strong>Grain:</strong> {schema.grain}
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-zinc-100 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-950/50">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 uppercase">
                          <th className="pb-1.5 font-bold">Column</th>
                          <th className="pb-1.5 font-bold">Type</th>
                          <th className="pb-1.5 font-bold">Key</th>
                          <th className="pb-1.5 font-bold">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-mono">
                        {schema.columns.map((c) => (
                          <tr key={c.name} className="hover:bg-white/50 dark:hover:bg-zinc-900/50">
                            <td className="py-1.5 font-bold text-zinc-900 dark:text-zinc-100">{c.name}</td>
                            <td className="py-1.5 text-zinc-500 dark:text-zinc-400">{c.type}</td>
                            <td className="py-1.5">
                              {c.keyType === "PK" && (
                                <span className="inline-flex items-center gap-0.5 rounded-sm bg-amber-500/10 px-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                  <KeyRound size={9} /> PK
                                </span>
                              )}
                              {c.keyType === "FK" && (
                                <span className="inline-flex items-center gap-0.5 rounded-sm bg-blue-500/10 px-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                  FK
                                </span>
                              )}
                            </td>
                            <td className="py-1.5 font-sans text-xs text-zinc-500 dark:text-zinc-400">{c.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Production Code & Query Snippet */}
        {project.codeSnippet && (
          <section className="mb-14">
            <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              <Code2 className="text-cyan-500" size={20} />
              {project.codeSnippet.title} ({project.codeSnippet.language.toUpperCase()})
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-200 font-mono shadow-xl">
              <pre>
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* 6. Key Results & Business Impact */}
        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 dark:bg-emerald-950/20">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Quantifiable Impact & Verified Outcomes
          </h2>
          <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            {project.keyResults.map((result, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span className="leading-relaxed">{result}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
