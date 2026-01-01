import type { Scene, TimeOfDay } from '../types';

export const scenes: Record<string, Scene> = {
  bedroom: {
    id: 'bedroom',
    name: 'Schlafzimmer',
    backgroundImage: 'bg-gradient-to-br from-indigo-900 to-purple-900',
    characterOutfit: 'sleepwear',
    availableTimeOfDay: ['morning', 'night'],
  },
  prayer_room: {
    id: 'prayer_room',
    name: 'Gebetsecke',
    backgroundImage: 'bg-gradient-to-br from-green-800 to-emerald-900',
    characterOutfit: 'thobe',
    availableTimeOfDay: ['morning', 'midday', 'afternoon', 'evening', 'night'],
  },
  warehouse: {
    id: 'warehouse',
    name: 'Lager',
    backgroundImage: 'bg-gradient-to-br from-gray-700 to-gray-900',
    characterOutfit: 'casual',
    availableTimeOfDay: ['morning', 'midday'],
  },
  home_office: {
    id: 'home_office',
    name: 'Home Office',
    backgroundImage: 'bg-gradient-to-br from-blue-800 to-blue-900',
    characterOutfit: 'casual',
    availableTimeOfDay: ['midday', 'afternoon', 'evening'],
  },
  gym: {
    id: 'gym',
    name: 'Gym',
    backgroundImage: 'bg-gradient-to-br from-orange-700 to-red-900',
    characterOutfit: 'sportswear',
    availableTimeOfDay: ['afternoon', 'evening'],
  },
  driving_school: {
    id: 'driving_school',
    name: 'Fahrschule',
    backgroundImage: 'bg-gradient-to-br from-purple-700 to-indigo-900',
    characterOutfit: 'casual',
    availableTimeOfDay: ['afternoon'],
  },
};

export const timeOfDayRanges: Record<TimeOfDay, { start: number; end: number; name: string }> = {
  morning: { start: 5, end: 9, name: 'Morgen' },
  midday: { start: 9, end: 13, name: 'Vormittag' },
  afternoon: { start: 13, end: 17, name: 'Nachmittag' },
  evening: { start: 17, end: 21, name: 'Abend' },
  night: { start: 21, end: 5, name: 'Nacht' },
};

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 9) return 'morning';
  if (hour >= 9 && hour < 13) return 'midday';
  if (hour >= 13 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export function getAvailableScenes(timeOfDay: TimeOfDay): Scene[] {
  return Object.values(scenes).filter((scene) =>
    scene.availableTimeOfDay.includes(timeOfDay)
  );
}
