import type { GameTime } from '../../types';
import { getTimeOfDay, timeOfDayRanges } from '../../data/scenes';

interface TimeDisplayProps {
  gameTime: GameTime;
}

const timeOfDayIcons: Record<string, string> = {
  morning: '🌅',
  midday: '☀️',
  afternoon: '🌤️',
  evening: '🌆',
  night: '🌙',
};

export function TimeDisplay({ gameTime }: TimeDisplayProps) {
  const hours = String(gameTime.currentHour).padStart(2, '0');
  const minutes = String(gameTime.currentMinute).padStart(2, '0');
  const timeOfDay = getTimeOfDay(gameTime.currentHour);
  const timeInfo = timeOfDayRanges[timeOfDay];

  return (
    <div className="flex items-center justify-between bg-bg-card rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{timeOfDayIcons[timeOfDay]}</span>
        <div>
          <div className="text-2xl font-bold text-text-primary">
            {hours}:{minutes}
          </div>
          <div className="text-sm text-text-secondary">{timeInfo.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-text-primary">Tag {gameTime.currentDay}</div>
        <div className="text-sm text-text-muted">
          Alter: {(gameTime.gameStartAge + gameTime.currentDay / 365).toFixed(1)}
        </div>
      </div>
    </div>
  );
}
