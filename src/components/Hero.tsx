"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

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
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
        Shaun Lin
      </h1>
      <p className="mb-8 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
        Data Engineer & Analytics Specialist
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex gap-6"
      >
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="rounded-full p-3 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <Icon size={24} strokeWidth={1.5} />
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
}
