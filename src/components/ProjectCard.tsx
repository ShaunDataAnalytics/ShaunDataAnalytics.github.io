"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, ExternalLink, Github, Layers, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data";

type ProjectCardProps = {
  project: Project & { stars?: number | null };
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-7 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-cyan-500/50"
    >
      <div>
        {/* Top Header: Category & Highlights */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              {project.category}
            </span>
            {project.schemas && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                <Database size={12} />
                Schema Certified
              </span>
            )}
          </div>
          {project.stars != null && project.stars > 0 && (
            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-zinc-900 transition-colors group-hover:text-cyan-600 dark:text-zinc-50 dark:group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="mb-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {project.subtitle}
        </p>

        <p className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>

        {/* Technical Highlights / Bullet Points (Yanna Style) */}
        {project.quickHighlights && project.quickHighlights.length > 0 && (
          <div className="mb-6 rounded-xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Technical Architecture Highlights
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              {project.quickHighlights.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-cyan-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics Highlight Pills */}
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-2">
          {project.metrics.slice(0, 2).map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-zinc-100 bg-white p-3 shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900/80"
            >
              <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                {m.label}
              </p>
              <p className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400"
        >
          Explore Case Study
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="flex items-center gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target={project.demoUrl.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-600 transition-colors hover:bg-cyan-500/20 dark:bg-cyan-400/10 dark:text-cyan-400 dark:hover:bg-cyan-400/20"
              title="Open Live Interactive Demo"
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="View GitHub Repository"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
