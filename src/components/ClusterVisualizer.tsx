"use client";

import { useState } from "react";
import { Layers, RefreshCw, Sliders } from "lucide-react";

type ClusterPoint = {
  id: number;
  x: number; // Recency
  y: number; // Frequency
  z: number; // Monetary
  cluster: number;
};

const initialPoints: ClusterPoint[] = [
  // Cluster 0: Champions (High Frequency, High Monetary, Low Recency days)
  { id: 1, x: 12, y: 88, z: 92, cluster: 0 },
  { id: 2, x: 8, y: 95, z: 89, cluster: 0 },
  { id: 3, x: 15, y: 82, z: 94, cluster: 0 },
  { id: 4, x: 5, y: 90, z: 96, cluster: 0 },
  // Cluster 1: At-Risk Loyalists (High Monetary, High Recency days ago)
  { id: 5, x: 85, y: 75, z: 80, cluster: 1 },
  { id: 6, x: 92, y: 70, z: 84, cluster: 1 },
  { id: 7, x: 78, y: 68, z: 76, cluster: 1 },
  { id: 8, x: 88, y: 80, z: 82, cluster: 1 },
  // Cluster 2: Occasional Bargain Seekers (Low Monetary, Mid Frequency)
  { id: 9, x: 45, y: 35, z: 25, cluster: 2 },
  { id: 10, x: 50, y: 40, z: 30, cluster: 2 },
  { id: 11, x: 38, y: 30, z: 22, cluster: 2 },
  { id: 12, x: 55, y: 45, z: 28, cluster: 2 },
  // Cluster 3: New / Low Activity Users (Low Frequency, Low Monetary)
  { id: 13, x: 20, y: 15, z: 12, cluster: 3 },
  { id: 14, x: 25, y: 20, z: 18, cluster: 3 },
  { id: 15, x: 18, y: 12, z: 10, cluster: 3 },
  { id: 16, x: 30, y: 22, z: 15, cluster: 3 },
];

const clusterColors = [
  { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500", label: "Champions (High Value)" },
  { bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500", label: "At-Risk Loyalists" },
  { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500", label: "Bargain Seekers" },
  { bg: "bg-purple-500", text: "text-purple-400", border: "border-purple-500", label: "New / Low Activity" },
];

export default function ClusterVisualizer() {
  const [clusters, setClusters] = useState<number>(4);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            <Layers className="text-cyan-500" size={20} />
            Interactive Cluster Space Simulation (k = {clusters})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Projected Customer Centroids mapped across Frequency (Y) vs Recency (X)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <Sliders size={14} />
            Clusters (k):
            <select
              value={clusters}
              onChange={(e) => setClusters(Number(e.target.value))}
              className="rounded-lg border border-zinc-300 bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              <option value={2}>k = 2</option>
              <option value={3}>k = 3</option>
              <option value={4}>k = 4 (Optimal)</option>
            </select>
          </label>

          <button
            onClick={() => setSelectedCluster(null)}
            className="flex items-center gap-1 rounded-lg bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            <RefreshCw size={12} />
            Reset Filter
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative aspect-video w-full rounded-xl border border-zinc-200 bg-zinc-950 p-4 shadow-inner dark:border-zinc-800">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
          <div className="border-r border-b border-white"></div>
          <div className="border-r border-b border-white"></div>
          <div className="border-r border-b border-white"></div>
          <div className="border-b border-white"></div>
          <div className="border-r border-b border-white"></div>
          <div className="border-r border-b border-white"></div>
          <div className="border-r border-b border-white"></div>
          <div className="border-b border-white"></div>
        </div>

        {/* Axis Labels */}
        <span className="absolute bottom-2 right-4 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
          Recency (Days) →
        </span>
        <span className="absolute top-4 left-3 text-[10px] uppercase font-bold tracking-widest text-zinc-500 -rotate-90 origin-left">
          Frequency (Orders) →
        </span>

        {/* Data Points */}
        {initialPoints.map((pt) => {
          const effectiveCluster = pt.cluster % clusters;
          const isSelected = selectedCluster === null || selectedCluster === effectiveCluster;
          const color = clusterColors[effectiveCluster];

          return (
            <div
              key={pt.id}
              onClick={() => setSelectedCluster(effectiveCluster)}
              style={{
                left: `${pt.x}%`,
                bottom: `${pt.y}%`,
              }}
              className={`absolute h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 ${
                color.bg
              } ${isSelected ? "scale-100 opacity-90 shadow-lg shadow-cyan-500/20" : "scale-75 opacity-20"}`}
              title={`Customer #${pt.id} - Cluster ${effectiveCluster}`}
            >
              <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${color.bg}`} />
            </div>
          );
        })}
      </div>

      {/* Cluster Legend */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {clusterColors.slice(0, clusters).map((c, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCluster(selectedCluster === idx ? null : idx)}
            className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${
              selectedCluster === idx
                ? `${c.border} bg-zinc-100 dark:bg-zinc-800/90 font-bold`
                : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
            }`}
          >
            <span className={`h-3 w-3 rounded-full ${c.bg}`} />
            <div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Cluster {idx}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{c.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
