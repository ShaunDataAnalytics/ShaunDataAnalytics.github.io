"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data";

type ProjectCardProps = {
  project: Project & { stars?: number | null };
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isAiDemo = project.projectGroup === "ai";

  const caseStudyLink = (
    <Link
      href={`/projects/${project.slug}`}
      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-bold text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700"
    >
      <span>Case Study</span>
      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );

  const liveDemoLink =
    project.demoUrl != null && project.demoUrl !== "" ? (
      <a
        href={project.demoUrl}
        target={project.demoUrl.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400"
        title="Open Live Interactive Demo"
      >
        <ExternalLink size={13} />
        <span>Live Demo</span>
      </a>
    ) : null;

  const githubLink = (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      title="View GitHub Repository"
    >
      <Github size={17} />
    </a>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-cyan-500/40"
    >
      <div>
        {/* Top Header: Category & Schema Certification */}
        <div className="mb-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 px-3 py-0.5 text-[11px] font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              {project.category}
            </span>
            {project.schemas && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                <Database size={11} />
                Schema Certified
              </span>
            )}
          </div>
          {project.stars != null && project.stars > 0 && (
            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-extrabold tracking-tight text-zinc-900 transition-colors group-hover:text-cyan-600 dark:text-zinc-50 dark:group-hover:text-cyan-400">
          {project.title}
        </h3>

        {/* Concise Description */}
        <p className="mb-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-sm">
          {project.description}
        </p>

        {/* Metrics Highlight Pills */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {project.metrics.slice(0, 2).map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-2.5 dark:border-zinc-800/80 dark:bg-zinc-950/40"
              >
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                  {m.label}
                </p>
                <p className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 sm:text-base">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Badges (Capped at 4 to prevent clutter) */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-zinc-200/80 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md px-1.5 py-0.5 text-[11px] text-zinc-400">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3.5 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          {liveDemoLink}
          {caseStudyLink}
        </div>
        {githubLink}
      </div>
    </motion.article>
  );
}
