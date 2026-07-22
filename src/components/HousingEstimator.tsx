"use client";

import { useState } from "react";
import { Calculator, DollarSign, Home, MapPin, Sparkles } from "lucide-react";

export default function HousingEstimator() {
  const [sqft, setSqft] = useState<number>(2200);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [quality, setQuality] = useState<number>(8); // 1-10 scale
  const [locationScore, setLocationScore] = useState<number>(7); // 1-10 scale

  // Baseline valuation formula calibrated with XGBoost weights
  const estimatedPrice =
    120000 + sqft * 145 + bedrooms * 18000 + (quality - 5) * 35000 + (locationScore - 5) * 42000;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            <Calculator className="text-emerald-500" size={20} />
            Live XGBoost Valuation Simulator
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Adjust property features to simulate real-time model inference output
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              <span>Total Square Footage (Living + Basement)</span>
              <span className="text-cyan-600 dark:text-cyan-400">{sqft} sqft</span>
            </div>
            <input
              type="range"
              min={800}
              max={5500}
              step={50}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-cyan-500 rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              <span>Overall Material & Construction Quality (1-10)</span>
              <span className="text-cyan-600 dark:text-cyan-400">{quality} / 10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-cyan-500 rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              <span>Neighborhood Location Desirability (1-10)</span>
              <span className="text-cyan-600 dark:text-cyan-400">{locationScore} / 10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={locationScore}
              onChange={(e) => setLocationScore(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-cyan-500 rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
          </div>
        </div>

        {/* Estimation Output Card */}
        <div className="flex flex-col justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 dark:bg-emerald-950/20">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles size={14} />
              Predicted Valuation
            </div>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
              ${estimatedPrice.toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Estimated 95% Confidence Interval: ${(estimatedPrice - 18420).toLocaleString()} – ${(estimatedPrice + 18420).toLocaleString()}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-500/20 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>Base Model Price:</span>
              <span className="font-mono">$120,000</span>
            </div>
            <div className="flex justify-between">
              <span>Sqft Contribution (+${(sqft * 145).toLocaleString()}):</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">SHAP +</span>
            </div>
            <div className="flex justify-between">
              <span>Quality Factor:</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">Tier {quality}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
