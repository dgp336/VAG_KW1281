export type Metric = {
  label: string;
  value: string;
  detail: string;
  accent: string;
  min: number;
  max: number;
};

export const DEFAULT_METRICS: Metric[] = [
  {
    label: "RPM",
    value: "870",
    detail: "Ralentí estable y respuesta bajo carga",
    accent: "bg-cyan-300",
    min: 0,
    max: 5000,
  },
  {
    label: "Velocidad",
    value: "0 km/h",
    detail: "Lectura para pruebas en carretera",
    accent: "bg-emerald-300",
    min: 0,
    max: 220,
  },
  {
    label: "Temp. refrigerante",
    value: "68.0 °C",
    detail: "Seguimiento térmico del motor",
    accent: "bg-orange-300",
    min: 40,
    max: 110,
  },
  {
    label: "Temp. admisión",
    value: "23.0 °C",
    detail: "Control de aire y eficiencia del turbo",
    accent: "bg-fuchsia-300",
    min: 0,
    max: 70,
  },
  {
    label: "Voltaje batería",
    value: "12.40 V",
    detail: "Estado de carga y alternador",
    accent: "bg-yellow-300",
    min: 11.5,
    max: 14.8,
  },
  {
    label: "Presión turbo",
    value: "0.98 bar",
    detail: "Presión relativa en el colector",
    accent: "bg-sky-300",
    min: 0.8,
    max: 2.0,
  },
];
