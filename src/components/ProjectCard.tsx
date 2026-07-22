"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Sparkles, Star } from "lucide-react";
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
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-cyan-500/40"
    >
      <div>
        {/* Category & Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
            {project.category}
          </span>
          {project.stars != null && (
            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="mb-2 text-xl font-extrabold text-zinc-900 transition-colors group-hover:text-cyan-600 dark:text-zinc-50 dark:group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {/* Metrics Highlight Pills */}
        <div className="mb-5 grid grid-cols-2 gap-2">
          {project.metrics.slice(0, 2).map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800/80 dark:bg-zinc-950/50"
            >
              <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                {m.label}
              </p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
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
          className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          Explore Case Study
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          title="View GitHub Source"
        >
          <Github size={18} />
        </a>
      </div>
    </motion.article>
  );
}
