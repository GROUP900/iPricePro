export interface Product {
  releases: `${string}-${string}-${string}`[];
  estimatedUpdate?: number;
}

export enum Conclusion {
  BUY_NOW,
  NEUTRAL,
  CAUTION,
  DONT_BUY,
}

export interface Suggestion {
  conclusion: Conclusion;
  average: number;
  current: readonly [string, number];
  recentReleases: (readonly [string, number])[];
  estimatedUpdate?: number;
}
