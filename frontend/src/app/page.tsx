'use client';

import { MetricCard } from "@/components/MetricCard";
import { useTelemetry } from "@/hooks/useTelemetry";

export default function Home() {
  const { metrics, frameIndex, frameCount, isMockLive } = useTelemetry();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_25%),linear-gradient(180deg,_#08111f_0%,_#050b14_100%)]" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur lg:grid-cols-[1.6fr_1fr] lg:p-8">
          <section className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-200">
              Sprint 1 MVP
            </div>
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Monitorización VAG KW1281 preparada para escritorio y mobile desde el primer día.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Base Next.js + Tailwind para visualizar datos en vivo del León 1.9 TDI y evolucionar después a
                diagnóstico, históricos y acciones de taller.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">ECU</p>
                <p className="mt-1 text-sm font-medium text-white">Buscando KW1281 / K-line</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Perfil</p>
                <p className="mt-1 text-sm font-medium text-white">Seat Leon 1.9 TDI 2004</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Estado</p>
                <p className="mt-1 text-sm font-medium text-emerald-300">
                  {isMockLive ? "Mock en bucle" : "Conectado"}
                </p>
              </div>
            </div>
          </section>

          <aside className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Resumen del sprint</p>
                <p className="mt-1 text-lg font-medium text-white">MVP operativo</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 animate-[float_6s_ease-in-out_infinite]">
                KW
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">Métricas activas</p>
                <p className="mt-1 text-2xl font-semibold text-white">{metrics.length}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">Fallos detectados</p>
                <p className="mt-1 text-2xl font-semibold text-white">2</p>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-50">
              Lecturas simuladas actualizándose en ciclo {frameIndex + 1}/{frameCount} para validar cambios visuales.
            </div>
          </aside>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Roadmap del MVP</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Sprint 1 hacia el producto mínimo</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Responsive first
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm font-medium text-white">1. Conexión</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Emparejar Arduino/ESP32 y mostrar estado de enlace.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm font-medium text-white">2. Dashboard</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">RPM, velocidad, temperaturas, voltaje y boost.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm font-medium text-white">3. DTCs</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Listado, detalle y borrado con confirmación.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm font-medium text-white">4. Histórico</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Guardar sesiones y exportar a CSV/JSON.</p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Siguiente pantalla</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Modo taller</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Aquí luego entran adaptaciones, basic settings y output tests, pero dejando la escritura bloqueada por
              seguridad hasta que el motor esté parado.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Modo lectura seguro</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Permisos por rol</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Confirmación doble antes de escribir</div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
