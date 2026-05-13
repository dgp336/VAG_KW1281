"use client";

import { useEffect, useMemo, useState } from "react";

import { ECU_MOCK_FRAMES } from "@/lib/ecuMockFrames";
import { adaptFrameToMetrics } from "@/lib/telemetryAdapter";

export function useTelemetry(intervalMs = 100) {
  const [frameIndex, setFrameIndex] = useState(0);

  const metricsByFrame = useMemo(() => ECU_MOCK_FRAMES.map((frame) => adaptFrameToMetrics(frame)), []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrameIndex((currentFrame) => (currentFrame + 1) % metricsByFrame.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, metricsByFrame.length]);

  const metrics = useMemo(() => metricsByFrame[frameIndex], [frameIndex, metricsByFrame]);

  return {
    metrics,
    frameIndex,
    frameCount: metricsByFrame.length,
    isMockLive: true,
  };
}