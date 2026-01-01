import type { Activity, StatEffect } from '../../types';

interface ActionButtonProps {
  activity: Activity;
  onClick: () => void;
  disabled?: boolean;
  showEffects?: boolean;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} Min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function formatEffect(effect: StatEffect): string {
  const sign = effect.change >= 0 ? '+' : '';
  return `${sign}${effect.change}`;
}

export function ActionButton({
  activity,
  onClick,
  disabled = false,
  showEffects = true,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-xl transition-all ${
        disabled
          ? 'bg-bg-card/50 text-text-muted cursor-not-allowed'
          : 'bg-bg-card hover:bg-accent/20 hover:ring-2 hover:ring-accent/50 cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary">{activity.name}</h4>
          <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
        </div>
        {activity.duration > 0 && (
          <span className="text-xs bg-bg-secondary px-2 py-1 rounded-full text-text-muted">
            {formatDuration(activity.duration)}
          </span>
        )}
      </div>

      {showEffects && activity.statEffects.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activity.statEffects.map((effect, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                effect.change >= 0
                  ? 'bg-success/20 text-success'
                  : 'bg-danger/20 text-danger'
              }`}
            >
              {effect.subStatId || effect.statId} {formatEffect(effect)}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
