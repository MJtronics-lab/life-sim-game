import type { Scene, TimeOfDay } from '../types';

// Scene background images
import bedroomBg from '../assets/scenes/bedroom.png';
import prayerRoomBg from '../assets/scenes/prayer-room.png';
import warehouseBg from '../assets/scenes/warehouse.png';
import homeOfficeBg from '../assets/scenes/home-office.png';
import gymBg from '../assets/scenes/gym.png';
import drivingSchoolBg from '../assets/scenes/driving-school.png';

export const scenes: Record<string, Scene> = {
  bedroom: {
    id: 'bedroom',
    name: 'Schlafzimmer',
    backgroundImage: bedroomBg,
    characterOutfit: 'sleepwear',
    availableTimeOfDay: ['morning', 'night'],
  },
  prayer_room: {
    id: 'prayer_room',
    name: 'Gebetsecke',
    backgroundImage: prayerRoomBg,
    characterOutfit: 'thobe',
    availableTimeOfDay: ['morning', 'midday', 'afternoon', 'evening', 'night'],
  },
  warehouse: {
    id: 'warehouse',
    name: 'Lager',
    backgroundImage: warehouseBg,
    characterOutfit: 'casual',
    availableTimeOfDay: ['morning', 'midday'],
  },
  home_office: {
    id: 'home_office',
    name: 'Home Office',
    backgroundImage: homeOfficeBg,
    characterOutfit: 'casual',
    availableTimeOfDay: ['midday', 'afternoon', 'evening'],
  },
  gym: {
    id: 'gym',
    name: 'Gym',
    backgroundImage: gymBg,
    characterOutfit: 'sportswear',
    availableTimeOfDay: ['afternoon', 'evening'],
  },
  driving_school: {
    id: 'driving_school',
    name: 'Fahrschule',
    backgroundImage: drivingSchoolBg,
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
