import type { Metric } from "@/types/metrics";
import type { DecodedEcuValues, EcuRawFrame } from "@/types/ecu";

type MetricConfig = {
  label: string;
  accent: string;
  min: number;
  max: number;
  select: (values: DecodedEcuValues) => number;
  format: (value: number) => string;
};

const METRIC_CONFIG: MetricConfig[] = [
  {
    label: "RPM",
    accent: "bg-cyan-300",
    min: 0,
    max: 5000,
    select: (values) => values.rpm,
    format: (value) => Math.round(value).toLocaleString("es-ES"),
  },
  {
    label: "Velocidad",
    accent: "bg-emerald-300",
    min: 0,
    max: 240,
    select: (values) => values.speedKmh,
    format: (value) => `${Math.round(value)} km/h`,
  },
  {
    label: "Temp. refrigerante",
    accent: "bg-orange-300",
    min: 0,
    max: 130,
    select: (values) => values.coolantTempC,
    format: (value) => `${value.toFixed(1)} °C`,
  },
  {
    label: "Temp. admision",
    accent: "bg-fuchsia-300",
    min: 0,
    max: 70,
    select: (values) => values.intakeTempC,
    format: (value) => `${value.toFixed(1)} °C`,
  },
  {
    label: "Voltaje bateria",
    accent: "bg-yellow-300",
    min: 0,
    max: 15,
    select: (values) => values.batteryVoltage,
    format: (value) => `${value.toFixed(2)} V`,
  },
  {
    label: "Presion turbo",
    accent: "bg-sky-300",
    min: 0,
    max: 2.0,
    select: (values) => values.boostBar,
    format: (value) => `${value.toFixed(2)} bar`,
  },
  {
    label: "Caudal MAF",
    accent: "bg-teal-300",
    min: 0,
    max: 1200,
    select: (values) => values.mafMgPerStroke,
    format: (value) => `${Math.round(value)} mg/str`,
  },
  {
    label: "Avance inyeccion",
    accent: "bg-violet-300",
    min: -5,
    max: 20,
    select: (values) => values.injectionAdvanceBtdc,
    format: (value) => `${value.toFixed(1)} deg BTDC`,
  },
  {
    label: "Pos. acelerador",
    accent: "bg-rose-300",
    min: 0,
    max: 100,
    select: (values) => values.throttlePercent,
    format: (value) => `${Math.round(value)} %`,
  },
  {
    label: "Temp. combustible",
    accent: "bg-lime-300",
    min: 0,
    max: 110,
    select: (values) => values.fuelTempC,
    format: (value) => `${value.toFixed(1)} °C`,
  },
];

function readWord(hi: number, lo: number) {
  return ((hi & 0xff) << 8) | (lo & 0xff);
}

export function decodeEcuFrame(frame: EcuRawFrame): DecodedEcuValues {
  const [, , rpmHi, rpmLo, speedRaw, coolantRaw, intakeRaw, voltageRaw, boostRaw, mafHi, mafLo, timingRaw, throttleRaw, fuelRaw] =
    frame.bytes;

  return {
    rpm: readWord(rpmHi, rpmLo) / 4,
    speedKmh: speedRaw,
    coolantTempC: coolantRaw - 48,
    intakeTempC: intakeRaw - 48,
    batteryVoltage: voltageRaw / 10,
    boostBar: boostRaw / 100,
    mafMgPerStroke: readWord(mafHi, mafLo),
    injectionAdvanceBtdc: timingRaw / 2 - 10,
    throttlePercent: (throttleRaw / 255) * 100,
    fuelTempC: fuelRaw - 48,
  };
}

export function adaptFrameToMetrics(frame: EcuRawFrame): Metric[] {
  const decoded = decodeEcuFrame(frame);

  return METRIC_CONFIG.map((metric) => {
    const rawValue = metric.select(decoded);

    return {
      label: metric.label,
      value: metric.format(rawValue),
      accent: metric.accent,
      min: metric.min,
      max: metric.max,
    };
  });
}
