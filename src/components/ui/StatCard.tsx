import type { Stat } from '../../types';
import { ProgressBar } from './ProgressBar';

interface StatCardProps {
  stat: Stat;
  compact?: boolean;
  onClick?: () => void;
}

export function StatCard({ stat, compact = false, onClick }: StatCardProps) {
  const isLow = stat.currentValue < 30;

  return (
    <div
      className={`bg-bg-card rounded-xl p-4 ${
        onClick ? 'cursor-pointer hover:bg-bg-card/80 transition-colors' : ''
      } ${isLow ? 'ring-2 ring-danger/50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={stat.icon}
          alt={stat.name}
          className="w-10 h-10 object-contain"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-text-primary font-semibold">{stat.name}</h3>
            <span className={`text-lg font-bold text-${stat.color}`}>
              {Math.round(stat.currentValue)}%
            </span>
          </div>
        </div>
      </div>

      <ProgressBar value={stat.currentValue} color={stat.color} height="md" />

      {!compact && stat.subStats && stat.subStats.length > 0 && (
        <div className="mt-3 space-y-2">
          {stat.subStats.map((subStat) => (
            <div key={subStat.id} className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">{subStat.name}</span>
              <span className="text-text-primary font-medium">
                {typeof subStat.currentValue === 'number' && subStat.currentValue % 1 !== 0
                  ? subStat.currentValue.toFixed(1)
                  : subStat.currentValue}
                {subStat.unit && ` ${subStat.unit}`}
                {subStat.target && (
                  <span className="text-text-muted"> / {subStat.target}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
