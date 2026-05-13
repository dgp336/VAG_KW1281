'use client';

import React from 'react';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-speedometer';
import { Metric } from '@/types/metrics';

export function RPMGauge({ label, value, min, max }: Metric) {
  const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const scaledValue = numValue / 1000;

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-slate-950 p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </h2>
      <div className="flex justify-center">
        <Speedometer
          value={scaledValue}
          max={5}
          width={280}
          height={280}
          angle={250}
          accentColor="#06b6d4"
          fontFamily="helvetica"
        >
          <Background angle={250} color="#07111f" opacity={0.8} />
          <Arc arcWidth={6} color="#1e293b" opacity={0.4} />
          <Needle baseOffset={35} circleRadius={20} color="#8cccff" />
          <DangerPath color="#ef4444" angle={45} arcWidth={6} offset={8} />
          <Progress arcWidth={8} color="#06b6d4" />
          <Marks step={0.5} fontSize={16} lineSize={10} />
        </Speedometer>
      </div>
      <div className="mt-4 text-center">
        <div className="text-5xl font-bold text-cyan-300">{value}</div>
      </div>
    </div>
  );
}
