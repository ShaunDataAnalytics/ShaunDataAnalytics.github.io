"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Github, Linkedin, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-6 py-3.5 shadow-lg backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/70">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-zinc-900 transition-colors hover:text-cyan-600 dark:text-zinc-50 dark:hover:text-cyan-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white shadow-sm dark:bg-cyan-500">
            <Sparkles size={18} />
          </div>
          <span>Shaun Lin</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Home
          </Link>
          <Link
            href="/#timeline"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Timeline
          </Link>
          <Link
            href="/#ai-projects"
            className="text-sm font-bold text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 flex items-center gap-1"
          >
            <span>🤖</span>
            <span>AI Demos</span>
          </Link>
          <Link
            href="/#data-projects"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-1"
          >
            <span>📊</span>
            <span>Data Projects</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ShaunDataAnalytics"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
