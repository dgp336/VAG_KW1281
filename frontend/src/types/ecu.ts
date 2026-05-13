export type EcuRawFrame = {
  sequence: number;
  timestampMs: number;
  bytes: number[];
};

export type DecodedEcuValues = {
  rpm: number;
  speedKmh: number;
  coolantTempC: number;
  intakeTempC: number;
  batteryVoltage: number;
  boostBar: number;
  mafMgPerStroke: number;
  injectionAdvanceBtdc: number;
  throttlePercent: number;
  fuelTempC: number;
};
