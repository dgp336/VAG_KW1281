"use client";

import { useEffect, useMemo, useState } from "react";

import { DEFAULT_METRICS, type Metric } from "@/types/metrics";

const FRAME_COUNT = 12;

type TelemetrySeries = {
  base: Metric;
  from: number;
  to: number;
  formatter: (value: number) => string;
};

const TELEMETRY_SERIES: TelemetrySeries[] = [
  {
    base: DEFAULT_METRICS[0],
    from: 870,
    to: 4000,
    formatter: (value) => `${Math.round(value).toLocaleString("es-ES")}`,
  },
  {
    base: DEFAULT_METRICS[1],
    from: 0,
    to: 110,
    formatter: (value) => `${Math.round(value)} km/h`,
  },
  {
    base: DEFAULT_METRICS[2],
    from: 68.0,
    to: 87.2,
    formatter: (value) => `${value.toFixed(1)} °C`,
  },
  {
    base: DEFAULT_METRICS[3],
    from: 23.0,
    to: 36.1,
    formatter: (value) => `${value.toFixed(1)} °C`,
  },
  {
    base: DEFAULT_METRICS[4],
    from: 12.4,
    to: 13.84,
    formatter: (value) => `${value.toFixed(2)} V`,
  },
  {
    base: DEFAULT_METRICS[5],
    from: 0.98,
    to: 1.55,
    formatter: (value) => `${value.toFixed(2)} bar`,
  },
  {
    base: DEFAULT_METRICS[6],
    from: 245,
    to: 705,
    formatter: (value) => `${Math.round(value)} mg/str`,
  },
  {
    base: DEFAULT_METRICS[7],
    from: 2.4,
    to: 5.8,
    formatter: (value) => `${value.toFixed(1)} °BTDC`,
  },
  {
    base: DEFAULT_METRICS[8],
    from: 14,
    to: 56,
    formatter: (value) => `${Math.round(value)} %`,
  },
  {
    base: DEFAULT_METRICS[9],
    from: 41.0,
    to: 52.1,
    formatter: (value) => `${value.toFixed(1)} °C`,
  },
];

function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

const TELEMETRY_FRAMES_DATA: Metric[][] = Array.from({ length: FRAME_COUNT }, (_, frameIndex) => {
  const progress = frameIndex / (FRAME_COUNT - 1);

  return TELEMETRY_SERIES.map(({ base, from, to, formatter }) => ({
    ...base,
    value: formatter(interpolate(from, to, progress)),
  }));
});

export function useTelemetry(intervalMs = 200) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrameIndex((currentFrame) => (currentFrame + 1) % TELEMETRY_FRAMES_DATA.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs]);

  const metrics = useMemo(() => TELEMETRY_FRAMES_DATA[frameIndex], [frameIndex]);

  return {
    metrics,
    frameIndex,
    frameCount: TELEMETRY_FRAMES_DATA.length,
    isMockLive: true,
  };
}