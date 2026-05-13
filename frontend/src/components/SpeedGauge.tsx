'use client';

import dynamic from 'next/dynamic';
import { Metric } from '@/types/metrics';

const Speedometer = dynamic(
  () => import('react-speedometer').then((module) => module.default),
  { ssr: false },
);

const Background = dynamic(
  () => import('react-speedometer').then((module) => module.Background),
  { ssr: false },
);

const Arc = dynamic(() => import('react-speedometer').then((module) => module.Arc), { ssr: false });

const Needle = dynamic(
  () => import('react-speedometer').then((module) => module.Needle),
  { ssr: false },
);

const Progress = dynamic(
  () => import('react-speedometer').then((module) => module.Progress),
  { ssr: false },
);

const Marks = dynamic(() => import('react-speedometer').then((module) => module.Marks), {
  ssr: false,
});

export function SpeedGauge({ label, value, max }: Metric) {
  const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-slate-950 p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </h2>
      <div className="flex justify-center">
        <Speedometer
          value={Math.max(0, Math.min(numValue, max))}
          max={max}
          width={280}
          height={280}
          angle={250}
          accentColor="#10b981"
          fontFamily="helvetica"
        >
          <Background angle={250} color="#07111f" opacity={0.8} />
          <Arc arcWidth={6} color="#1e293b" opacity={0.4} />
          <Needle baseOffset={35} circleRadius={20} color="#86efac" />
          <Progress arcWidth={8} color="#10b981" />
          <Marks step={10} fontSize={14} lineSize={10} />
        </Speedometer>
      </div>
      <div className="mt-4 text-center">
        <div className="text-5xl font-bold text-emerald-300">{value}</div>
      </div>
    </div>
  );
}
