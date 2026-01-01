import type { GameTime, TimeOfDay } from '../types';

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 9) return 'morning';
  if (hour >= 9 && hour < 13) return 'midday';
  if (hour >= 13 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function advanceGameTime(
  gameTime: GameTime,
  minutes: number
): { newTime: GameTime; dayChanged: boolean } {
  let newMinute = gameTime.currentMinute + minutes;
  let newHour = gameTime.currentHour;
  let newDay = gameTime.currentDay;
  let dayChanged = false;

  while (newMinute >= 60) {
    newMinute -= 60;
    newHour++;
  }

  while (newHour >= 24) {
    newHour -= 24;
    newDay++;
    dayChanged = true;
  }

  return {
    newTime: {
      ...gameTime,
      currentMinute: newMinute,
      currentHour: newHour,
      currentDay: newDay,
    },
    dayChanged,
  };
}

export function createInitialGameTime(): GameTime {
  return {
    currentDay: 1,
    currentHour: 6,
    currentMinute: 0,
    realStartDate: new Date().toISOString(),
    gameStartAge: 27.8,
  };
}

export function getTimeOfDayName(timeOfDay: TimeOfDay): string {
  const names: Record<TimeOfDay, string> = {
    morning: 'Morgen',
    midday: 'Vormittag',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    night: 'Nacht',
  };
  return names[timeOfDay];
}
