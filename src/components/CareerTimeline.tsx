"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle2 } from "lucide-react";

type Milestone = {
  id: string;
  period: string;
  role: string;
  company: string;
  category: "de" | "dq" | "edu";
  bullets: string[];
  skills: string[];
  type: "work" | "edu";
};

const milestones: Milestone[] = [
  {
    id: "naaap",
    period: "Jan 2025 – Present",
    role: "Associate Director of Data Insights (Volunteer)",
    company: "NAAAP Boston",
    category: "de",
    type: "work",
    bullets: [
      "Built and led NAAAP Boston's data engineering team, driving data strategy and technical execution.",
      "Owned design and deployment of 1st end-to-end data stack leveraging Airflow, BigQuery, and dbt (enabled 10x data volume processing).",
      "Established Kanban workflow and DE code reviews/version control, creating a predictable project roadmap."
    ],
    skills: ["Airflow", "BigQuery", "dbt", "DE Leadership", "Kanban"]
  },
  {
    id: "gatech",
    period: "May 2025",
    role: "Master of Science in Analytics",
    company: "Georgia Institute of Technology",
    category: "edu",
    type: "edu",
    bullets: [
      "Advanced analytical modeling, machine learning, statistical computing, and data architecture."
    ],
    skills: ["MS Analytics", "Machine Learning", "Statistical Computing"]
  },
  {
    id: "asa",
    period: "Jun 2022 – Jun 2024",
    role: "Data Analytics Engineer",
    company: "American Student Assistance",
    category: "de",
    type: "work",
    bullets: [
      "Optimized 10+ dbt models and Snowflake DB structures, reducing average model build time by 20% and accelerating data retrieval by 30%.",
      "Orchestrated integration of 10+ disparate data sources through automated pipelines, establishing a unified source of truth.",
      "Engineered underlying data models and written performance-tuned SQL for executive Tableau reporting."
    ],
    skills: ["Snowflake", "dbt", "SQL Optimization", "Tableau", "ETL Pipelines"]
  },
  {
    id: "kafene",
    period: "Feb 2022 – Apr 2022",
    role: "Data Quality Engineer",
    company: "Kafene",
    category: "dq",
    type: "work",
    bullets: [
      "Improved data integrity by writing and executing Python & SQL scripts to detect anomalies.",
      "Expanded data quality test coverage by updating and committing revised SQL scripts to GitHub.",
      "Created comprehensive Data Dictionary and detailed relational database diagrams (ERDs)."
    ],
    skills: ["Python", "SQL", "Data Quality", "ERD Modeling", "Git"]
  },
  {
    id: "springboard",
    period: "Aug 2020",
    role: "Data Science Bootcamp Certification",
    company: "Springboard",
    category: "edu",
    type: "edu",
    bullets: [
      "Intensive data science, Python, pandas, machine learning algorithms, and hands-on capstone projects."
    ],
    skills: ["Python", "Pandas", "Machine Learning", "Data Science"]
  },
  {
    id: "biogen",
    period: "Dec 2017 – Dec 2019",
    role: "Data Analyst",
    company: "Biogen",
    category: "dq",
    type: "work",
    bullets: [
      "Remediated data quality issues across 10+ departments to ensure business compliance and accuracy.",
      "Reduced manual effort by 50% by engineering automated data migration solutions using Excel VBA.",
      "Established and monitored key performance indicators for data migration projects."
    ],
    skills: ["Data Remediation", "Excel VBA", "KPI Tracking", "Migration"]
  },
  {
    id: "umass",
    period: "May 2014",
    role: "B.B.A. in Finance",
    company: "University of Massachusetts Amherst",
    category: "edu",
    type: "edu",
    bullets: [
      "Bachelor of Business Administration in Finance. Financial modeling, business economics, and quantitative analysis."
    ],
    skills: ["Finance", "Economics", "Quantitative Analysis"]
  }
];

export default function CareerTimeline() {
  const [filter, setFilter] = useState<"all" | "de" | "dq" | "edu">("all");

  const filtered = milestones.filter(
    (m) => filter === "all" || m.category === filter
  );

  return (
    <section id="timeline" className="py-16 scroll-mt-24">
      <div className="mb-12 text-center">
        <span className="rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
          Career Trajectory
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Experience & Impact Timeline
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          5+ years bridging analytics architecture, data quality engineering, and scalable data stacks.
        </p>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "All Milestones" },
            { id: "de", label: "Data Engineering" },
            { id: "dq", label: "Data Quality & Analytics" },
            { id: "edu", label: "Education & Degrees" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                filter === item.id
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20 dark:bg-cyan-500"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative mx-auto max-w-4xl border-l-2 border-cyan-500/30 dark:border-cyan-400/20 pl-6 sm:pl-8 space-y-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Icon Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-cyan-600 text-white shadow-md dark:border-zinc-950 dark:bg-cyan-500">
                {item.type === "edu" ? (
                  <GraduationCap size={14} />
                ) : (
                  <Briefcase size={14} />
                )}
              </div>

              {/* Card Container */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all hover:border-cyan-500/40 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-cyan-400/40">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-cyan-600 dark:text-cyan-400">
                    <Calendar size={13} />
                    {item.period}
                  </span>
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    {item.company}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {item.role}
                </h3>

                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-cyan-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium font-mono text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
