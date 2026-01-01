import type { Stat } from '../../types';
import { StatCard } from '../ui/StatCard';

interface StatsPanelProps {
  stats: Record<string, Stat>;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const statOrder = ['deen', 'fitness', 'business', 'fuehrerschein'];

  return (
    <div className="h-full bg-bg-secondary p-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-text-primary mb-4">Stats</h2>
      <div className="space-y-4">
        {statOrder.map((statId) => {
          const stat = stats[statId];
          if (!stat) return null;
          return <StatCard key={statId} stat={stat} />;
        })}
      </div>
    </div>
  );
}
