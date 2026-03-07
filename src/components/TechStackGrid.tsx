"use client";

import {
  Database,
  GitBranch,
  Code2,
  BarChart3,
  Cloud,
  FileJson,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const techItems = [
  { name: "Data Engineering", icon: Database },
  { name: "Python", icon: Code2 },
  { name: "Analytics", icon: BarChart3 },
  { name: "Cloud", icon: Cloud },
  { name: "APIs & ETL", icon: FileJson },
  { name: "Pipelines", icon: Layers },
  { name: "Version Control", icon: GitBranch },
  { name: "Automation", icon: Sparkles },
];

export default function TechStackGrid() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20"
    >
      <h2 className="mb-12 text-center text-2xl font-semibold text-zinc-800 dark:text-zinc-200 sm:text-3xl">
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {techItems.map(({ name, icon: Icon }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/20 bg-white/30 p-6 backdrop-blur-sm transition-colors hover:bg-white/50 dark:border-zinc-700/50 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50"
          >
            <Icon
              size={32}
              className="text-zinc-600 dark:text-zinc-400"
              strokeWidth={1.5}
            />
            <span className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
