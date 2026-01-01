import type { Stat } from '../types';

export function calculateDecay(stat: Stat, daysPassed: number = 1): number {
  const decayAmount = stat.decayRate * daysPassed;
  return Math.max(0, stat.currentValue - decayAmount);
}

export function applyDecayToStats(
  stats: Record<string, Stat>,
  daysPassed: number = 1
): Record<string, Stat> {
  const updatedStats: Record<string, Stat> = {};

  for (const [statId, stat] of Object.entries(stats)) {
    updatedStats[statId] = {
      ...stat,
      currentValue: calculateDecay(stat, daysPassed),
    };
  }

  return updatedStats;
}

export function getStatWarningLevel(value: number): 'none' | 'warning' | 'critical' {
  if (value < 20) return 'critical';
  if (value < 30) return 'warning';
  return 'none';
}
