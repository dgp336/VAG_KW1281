import type { EcuRawFrame } from "@/types/ecu";

const FRAME_TOTAL = 36;
const FRAME_STEP_MS = 200;

function clampByte(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function clampWord(value: number) {
  return Math.min(65535, Math.max(0, Math.round(value)));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function encodeFrame(index: number): EcuRawFrame {
  const progress = index / (FRAME_TOTAL - 1);
  const wave = Math.sin(progress * Math.PI * 2);

  const rpm = lerp(870, 4050, progress) + wave * 120;
  const speed = lerp(0, 112, progress) + Math.max(0, wave * 4);
  const coolant = lerp(68.0, 88.0, progress) + wave * 0.5;
  const intake = lerp(23.0, 37.0, progress) + wave * 0.4;
  const voltage = lerp(12.4, 13.9, progress) - Math.max(0, wave) * 0.08;
  const boost = lerp(0.98, 1.58, progress) + Math.max(0, wave) * 0.03;
  const maf = lerp(245, 730, progress) + Math.max(0, wave) * 20;
  const timing = lerp(2.4, 5.9, progress) + wave * 0.1;
  const throttle = lerp(14, 58, progress) + Math.max(0, wave) * 3;
  const fuelTemp = lerp(41.0, 53.0, progress) + wave * 0.3;

  const rpmRaw = clampWord(rpm * 4);
  const mafRaw = clampWord(maf);

  const payload = [
    0xf6,
    clampByte(index),
    (rpmRaw >> 8) & 0xff,
    rpmRaw & 0xff,
    clampByte(speed),
    clampByte(coolant + 48),
    clampByte(intake + 48),
    clampByte(voltage * 10),
    clampByte(boost * 100),
    (mafRaw >> 8) & 0xff,
    mafRaw & 0xff,
    clampByte((timing + 10) * 2),
    clampByte((throttle / 100) * 255),
    clampByte(fuelTemp + 48),
  ];

  return {
    sequence: index,
    timestampMs: index * FRAME_STEP_MS,
    bytes: payload,
  };
}

export const ECU_MOCK_FRAMES: EcuRawFrame[] = Array.from({ length: FRAME_TOTAL }, (_, index) =>
  encodeFrame(index),
);
