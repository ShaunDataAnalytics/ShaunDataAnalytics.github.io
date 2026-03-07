"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/40 p-1 shadow-xl backdrop-blur-md transition-all hover:border-white/20 hover:shadow-2xl dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:hover:border-zinc-600/50"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        {project.stars != null && (
          <div className="mb-3 flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <span>{project.stars} stars</span>
          </div>
        )}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          View on GitHub
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.article>
  );
}
