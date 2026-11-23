"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data";

type ProjectSectionProps = {
  id: string;
  badge: string;
  badgeColor?: "cyan" | "indigo";
  title: string;
  description: string;
  projects: (Project & { stars?: number | null })[];
  initialCount?: number;
};

export default function ProjectSection({
  id,
  badge,
  badgeColor = "cyan",
  title,
  description,
  projects,
  initialCount = 2,
}: ProjectSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleProjects = expanded ? projects : projects.slice(0, initialCount);
  const remainingCount = projects.length - initialCount;

  const badgeClasses =
    badgeColor === "indigo"
      ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400"
      : "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400";

  return (
    <section
      id={id}
      className="py-14 scroll-mt-24 border-t border-zinc-200/80 dark:border-zinc-800/80 first:border-t-0"
    >
      <div className="mb-10 text-center">
        <span className={`rounded-full px-3.5 py-1 text-xs font-bold ${badgeClasses}`}>
          {badge}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {remainingCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="group inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-zinc-700 shadow-xs transition-all hover:border-cyan-500/50 hover:bg-zinc-50 hover:text-cyan-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-cyan-500/50 dark:hover:bg-zinc-800/80 dark:hover:text-cyan-400"
          >
            <span>
              {expanded ? "Show Fewer Flagships" : `View ${remainingCount} More Projects`}
            </span>
            {expanded ? (
              <ChevronUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
