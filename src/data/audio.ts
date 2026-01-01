// Audio configuration for each scene
// Place your MP3 files in /src/assets/audio/ with these names:
// - bedroom.mp3 (relaxing/sleep nasheeds)
// - prayer.mp3 (spiritual/quran nasheeds)
// - work.mp3 (focus/study nasheeds)
// - gym.mp3 (motivational/workout nasheeds)
// - driving.mp3 (uplifting nasheeds)

export interface AudioConfig {
  file: string | null;
  volumePreset: number; // 0-100
  name: string;
}

export const sceneAudio: Record<string, AudioConfig> = {
  bedroom: {
    file: '/audio/bedroom/nasheed-01.mp3',
    volumePreset: 20,
    name: 'Relaxing Nasheed',
  },
  prayer_room: {
    file: '/audio/prayer/nasheed-02.mp3',
    volumePreset: 25,
    name: 'Spiritual Nasheed',
  },
  warehouse: {
    file: '/audio/work/nasheed-07.mp3',
    volumePreset: 30,
    name: 'Focus Nasheed',
  },
  home_office: {
    file: '/audio/work/nasheed-08.mp3',
    volumePreset: 30,
    name: 'Focus Nasheed',
  },
  gym: {
    file: '/audio/gym/nasheed-21.mp3',
    volumePreset: 40,
    name: 'Workout Nasheed',
  },
  driving_school: {
    file: '/audio/driving/nasheed-12.mp3',
    volumePreset: 30,
    name: 'Uplifting Nasheed',
  },
};

export function getAudioForScene(sceneId: string): AudioConfig {
  return sceneAudio[sceneId] || sceneAudio.bedroom;
}
