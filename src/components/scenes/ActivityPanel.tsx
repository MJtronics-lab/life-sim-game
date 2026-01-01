import type { Activity } from '../../types';
import { ActionButton } from '../ui/ActionButton';

interface ActivityPanelProps {
  activities: Activity[];
  onActivitySelect: (activity: Activity) => void;
  disabled?: boolean;
}

export function ActivityPanel({
  activities,
  onActivitySelect,
  disabled = false,
}: ActivityPanelProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        Keine Aktivitäten verfügbar
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <ActionButton
          key={activity.id}
          activity={activity}
          onClick={() => onActivitySelect(activity)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
