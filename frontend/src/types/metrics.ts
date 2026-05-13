export type Metric = {
  label: string;
  value: string;
  accent: string;
  min: number;
  max: number;
};

export const DEFAULT_METRICS: Metric[] = [
  {
    label: "RPM",
    value: "870",
    accent: "bg-cyan-300",
    min: 0,
    max: 5000,
  },
  {
    label: "Velocidad",
    value: "0 km/h",
    accent: "bg-emerald-300",
    min: 0,
    max: 220,
  },
  {
    label: "Temp. refrigerante",
    value: "68.0 °C",
    accent: "bg-orange-300",
    min: 0,
    max: 130,
  },
  {
    label: "Temp. admisión",
    value: "23.0 °C",
    accent: "bg-fuchsia-300",
    min: 0,
    max: 70,
  },
  {
    label: "Voltaje batería",
    value: "12.40 V",
    accent: "bg-yellow-300",
    min: 0,
    max: 15,
  },
  {
    label: "Presión turbo",
    value: "0.98 bar",
    accent: "bg-sky-300",
    min: 0,
    max: 2.0,
  },
  {
    label: "Caudal MAF",
    value: "245 mg/str",
    accent: "bg-teal-300",
    min: 0,
    max: 1200,
  },
  {
    label: "Avance inyección",
    value: "2.4 °BTDC",
    accent: "bg-violet-300",
    min: -5,
    max: 20,
  },
  {
    label: "Pos. acelerador",
    value: "14 %",
    accent: "bg-rose-300",
    min: 0,
    max: 100,
  },
  {
    label: "Temp. combustible",
    value: "41.0 °C",
    accent: "bg-lime-300",
    min: 0,
    max: 110,
  },
];
