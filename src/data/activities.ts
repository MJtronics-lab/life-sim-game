import type { Activity } from '../types';

export const activities: Activity[] = [
  // ==================== SCHLAFZIMMER ====================
  {
    id: 'sleep',
    name: 'Schlafen',
    description: 'Beende den Tag und ruhe dich aus',
    duration: 0,
    sceneId: 'bedroom',
    statEffects: [],
    availableTimeOfDay: ['night'],
  },
  {
    id: 'wake_up',
    name: 'Aufwachen',
    description: 'Beginne einen neuen Tag',
    duration: 15,
    sceneId: 'bedroom',
    statEffects: [],
    availableTimeOfDay: ['morning'],
  },

  // ==================== GEBETSECKE ====================
  {
    id: 'pray_fajr',
    name: 'Fajr beten',
    description: 'Das Morgengebet verrichten',
    duration: 15,
    sceneId: 'prayer_room',
    statEffects: [{ statId: 'deen', change: 8 }],
    availableTimeOfDay: ['morning'],
  },
  {
    id: 'pray_dhuhr',
    name: 'Dhuhr beten',
    description: 'Das Mittagsgebet verrichten',
    duration: 15,
    sceneId: 'prayer_room',
    statEffects: [{ statId: 'deen', change: 6 }],
    availableTimeOfDay: ['midday'],
  },
  {
    id: 'pray_asr',
    name: 'Asr beten',
    description: 'Das Nachmittagsgebet verrichten',
    duration: 15,
    sceneId: 'prayer_room',
    statEffects: [{ statId: 'deen', change: 6 }],
    availableTimeOfDay: ['afternoon'],
  },
  {
    id: 'pray_maghrib',
    name: 'Maghrib beten',
    description: 'Das Abendgebet verrichten',
    duration: 15,
    sceneId: 'prayer_room',
    statEffects: [{ statId: 'deen', change: 6 }],
    availableTimeOfDay: ['evening'],
  },
  {
    id: 'pray_isha',
    name: 'Isha beten',
    description: 'Das Nachtgebet verrichten',
    duration: 15,
    sceneId: 'prayer_room',
    statEffects: [{ statId: 'deen', change: 8 }],
    availableTimeOfDay: ['night'],
  },
  {
    id: 'read_quran',
    name: 'Koran lesen',
    description: 'Im Koran lesen und Verse auswendig lernen',
    duration: 30,
    sceneId: 'prayer_room',
    statEffects: [
      { statId: 'deen', change: 5 },
      { statId: 'deen', subStatId: 'quran', change: 2 },
    ],
  },
  {
    id: 'learn_arabic',
    name: 'Arabisch lernen',
    description: 'Arabische Sprache studieren',
    duration: 45,
    sceneId: 'prayer_room',
    statEffects: [
      { statId: 'deen', change: 3 },
      { statId: 'deen', subStatId: 'arabic', change: 1 },
    ],
  },

  // ==================== LAGER ====================
  {
    id: 'process_orders',
    name: 'Bestellungen bearbeiten',
    description: 'Kundenbestellungen abwickeln',
    duration: 60,
    sceneId: 'warehouse',
    statEffects: [{ statId: 'business', change: 5 }],
  },
  {
    id: 'coordinate_staff',
    name: 'Mitarbeiter koordinieren',
    description: 'Team organisieren und anleiten',
    duration: 45,
    sceneId: 'warehouse',
    statEffects: [{ statId: 'business', change: 3 }],
  },
  {
    id: 'prepare_pcs',
    name: 'PCs vorbereiten',
    description: 'Computer aufbereiten und testen',
    duration: 90,
    sceneId: 'warehouse',
    statEffects: [{ statId: 'business', change: 4 }],
  },

  // ==================== HOME OFFICE ====================
  {
    id: 'optimize_ads',
    name: 'Google Ads optimieren',
    description: 'Werbekampagnen verbessern',
    duration: 60,
    sceneId: 'home_office',
    statEffects: [{ statId: 'business', change: 4 }],
  },
  {
    id: 'manage_shopify',
    name: 'Shopify pflegen',
    description: 'Online-Shop aktualisieren',
    duration: 45,
    sceneId: 'home_office',
    statEffects: [{ statId: 'business', change: 3 }],
  },
  {
    id: 'accounting',
    name: 'Buchhaltung',
    description: 'Finanzen verwalten',
    duration: 60,
    sceneId: 'home_office',
    statEffects: [{ statId: 'business', change: 2 }],
  },
  {
    id: 'strategy',
    name: 'Strategie planen',
    description: 'Geschäftsstrategie entwickeln',
    duration: 90,
    sceneId: 'home_office',
    statEffects: [{ statId: 'business', change: 5 }],
  },

  // ==================== GYM ====================
  {
    id: 'bench_press',
    name: 'Bankdrücken trainieren',
    description: 'Brustmuskulatur stärken',
    duration: 45,
    sceneId: 'gym',
    statEffects: [
      { statId: 'fitness', change: 5 },
      { statId: 'fitness', subStatId: 'bench', change: 0.5 },
    ],
  },
  {
    id: 'squat',
    name: 'Kniebeugen trainieren',
    description: 'Beinmuskulatur stärken',
    duration: 45,
    sceneId: 'gym',
    statEffects: [
      { statId: 'fitness', change: 5 },
      { statId: 'fitness', subStatId: 'squat', change: 0.5 },
    ],
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Ausdauer verbessern',
    duration: 30,
    sceneId: 'gym',
    statEffects: [{ statId: 'fitness', change: 3 }],
  },
  {
    id: 'full_body',
    name: 'Ganzkörper-Workout',
    description: 'Intensives Ganzkörpertraining',
    duration: 90,
    sceneId: 'gym',
    statEffects: [
      { statId: 'fitness', change: 8 },
      { statId: 'fitness', subStatId: 'weight', change: 0.1 },
    ],
  },

  // ==================== FAHRSCHULE ====================
  {
    id: 'theory_lesson',
    name: 'Theorie lernen',
    description: 'Theorieprüfung vorbereiten',
    duration: 60,
    sceneId: 'driving_school',
    statEffects: [
      { statId: 'fuehrerschein', change: 5 },
      { statId: 'fuehrerschein', subStatId: 'theory', change: 3 },
    ],
  },
  {
    id: 'driving_lesson',
    name: 'Fahrstunde',
    description: 'Praktische Fahrstunde absolvieren',
    duration: 90,
    sceneId: 'driving_school',
    statEffects: [
      { statId: 'fuehrerschein', change: 10 },
      { statId: 'fuehrerschein', subStatId: 'lessons', change: 1 },
    ],
    cooldown: 1440, // 24 Stunden (1 pro Tag)
  },
];

export function getActivitiesForScene(sceneId: string): Activity[] {
  return activities.filter((activity) => activity.sceneId === sceneId);
}

export function getAvailableActivities(
  sceneId: string,
  timeOfDay: string,
  currentTime: number
): Activity[] {
  return activities.filter((activity) => {
    if (activity.sceneId !== sceneId) return false;

    // Prüfe Tageszeit wenn vorhanden
    if (activity.availableTimeOfDay && !activity.availableTimeOfDay.includes(timeOfDay as any)) {
      return false;
    }

    // Prüfe Cooldown
    if (activity.cooldown && activity.lastUsed) {
      const cooldownEnd = activity.lastUsed + activity.cooldown * 60 * 1000;
      if (currentTime < cooldownEnd) return false;
    }

    return true;
  });
}
