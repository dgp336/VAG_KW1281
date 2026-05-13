import type { Metric } from "@/types/metrics";

function getProgressWidth(value: string, min: number, max: number) {
  const normalizedValue = Number.parseFloat(value.replace(/,/g, ""));

  if (!Number.isFinite(normalizedValue) || max <= min) {
    return "42%";
  }

  const clampedValue = Math.min(Math.max(normalizedValue, min), max);
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return `${Math.min(Math.max(percentage, 0), 100)}%`;
}

export function MetricCard({
  label,
  value,
  accent,
  min,
  max,
}: Metric) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`h-3 w-3 rounded-full ${accent} animate-pulse`} />
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-white/5 p-3">
        <div className="h-12 w-full rounded-xl bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04))]" />
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 transition-[width] duration-700 ease-out"
            style={{ width: getProgressWidth(value, min, max) }}
          />
        </div>
      </div>
    </article>
  );
}
