"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/ShaunDataAnalytics", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/shaundataanalytics/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:shouyuanlin@gmail.com", icon: Mail, label: "Email" },
];

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex min-h-[75vh] flex-col items-center justify-center pt-8 pb-16 text-center"
    >
      {/* Availability Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        Data Engineering & ML Analytics Portfolio
      </motion.div>

      {/* Main Headline */}
      <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl">
        Shaun Lin
      </h1>

      {/* Subtitle */}
      <p className="mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl leading-relaxed">
        Building high-performance data pipelines, predictive machine learning models, and interactive analytical dashboards.
      </p>

      {/* Primary CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400"
        >
          Explore Projects
          <ArrowDown size={16} />
        </a>
        <a
          href="/projects/clustering-analytics"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/80 px-6 py-3 text-sm font-bold text-zinc-800 shadow-sm backdrop-blur-md transition-all hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-zinc-600"
        >
          <Sparkles className="text-cyan-500" size={16} />
          Interactive 3D Demo
        </a>
      </motion.div>

      {/* Social Links */}
      <div className="flex gap-4">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="rounded-xl border border-zinc-200 bg-white/60 p-3 text-zinc-600 shadow-sm transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </motion.section>
  );
}
