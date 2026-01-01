import { useEffect, useRef, useCallback } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAudioForScene } from '../data/audio';

interface AudioState {
  isEnabled: boolean;
  volume: number; // 0-100
  currentSceneId: string | null;
}

interface AudioStore extends AudioState {
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentScene: (sceneId: string) => void;
}

export const useAudioStore = create<AudioStore>()(
  persist(
    (set) => ({
      isEnabled: true,
      volume: 30,
      currentSceneId: null,

      setEnabled: (enabled) => set({ isEnabled: enabled }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),
      setCurrentScene: (sceneId) => set({ currentSceneId: sceneId }),
    }),
    {
      name: 'life-sim-audio-settings',
    }
  )
);

const FADE_DURATION = 2000; // 2 seconds

export function useAudio(sceneId: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const { isEnabled, volume, setCurrentScene } = useAudioStore();

  // Clean up fade interval
  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  // Fade out current audio
  const fadeOut = useCallback(
    (audio: HTMLAudioElement, onComplete?: () => void) => {
      clearFadeInterval();

      const startVolume = audio.volume;
      const steps = 20;
      const stepTime = FADE_DURATION / steps;
      const volumeStep = startVolume / steps;
      let currentStep = 0;

      fadeIntervalRef.current = window.setInterval(() => {
        currentStep++;
        const newVolume = Math.max(0, startVolume - volumeStep * currentStep);
        audio.volume = newVolume;

        if (currentStep >= steps) {
          clearFadeInterval();
          audio.pause();
          audio.currentTime = 0;
          onComplete?.();
        }
      }, stepTime);
    },
    [clearFadeInterval]
  );

  // Fade in new audio
  const fadeIn = useCallback(
    (audio: HTMLAudioElement, targetVolume: number) => {
      clearFadeInterval();

      audio.volume = 0;
      audio.play().catch(() => {
        // Autoplay blocked - user interaction required
        console.log('Audio autoplay blocked - waiting for user interaction');
      });

      const steps = 20;
      const stepTime = FADE_DURATION / steps;
      const volumeStep = targetVolume / steps;
      let currentStep = 0;

      fadeIntervalRef.current = window.setInterval(() => {
        currentStep++;
        const newVolume = Math.min(targetVolume, volumeStep * currentStep);
        audio.volume = newVolume;

        if (currentStep >= steps) {
          clearFadeInterval();
        }
      }, stepTime);
    },
    [clearFadeInterval]
  );

  // Handle scene change
  useEffect(() => {
    const audioConfig = getAudioForScene(sceneId);

    // If no audio file configured or audio disabled, stop any playing audio
    if (!audioConfig.file || !isEnabled) {
      if (audioRef.current) {
        fadeOut(audioRef.current);
      }
      return;
    }

    // Calculate actual volume (user volume * scene preset)
    const actualVolume = (volume / 100) * (audioConfig.volumePreset / 100);

    // If same scene, just update volume
    if (audioRef.current && audioRef.current.src.includes(audioConfig.file)) {
      audioRef.current.volume = actualVolume;
      return;
    }

    // Fade out old audio and fade in new
    if (audioRef.current) {
      fadeOut(audioRef.current, () => {
        // Create and start new audio
        const newAudio = new Audio(audioConfig.file!);
        newAudio.loop = true;
        audioRef.current = newAudio;
        fadeIn(newAudio, actualVolume);
      });
    } else if (audioConfig.file) {
      // No previous audio, just start new one
      const newAudio = new Audio(audioConfig.file);
      newAudio.loop = true;
      audioRef.current = newAudio;
      fadeIn(newAudio, actualVolume);
    }

    setCurrentScene(sceneId);

    // Cleanup on unmount
    return () => {
      clearFadeInterval();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [sceneId, isEnabled, volume, fadeIn, fadeOut, setCurrentScene, clearFadeInterval]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current && isEnabled) {
      const audioConfig = getAudioForScene(sceneId);
      const actualVolume = (volume / 100) * (audioConfig.volumePreset / 100);
      audioRef.current.volume = actualVolume;
    }
  }, [volume, sceneId, isEnabled]);

  // Handle enable/disable
  useEffect(() => {
    if (!isEnabled && audioRef.current) {
      fadeOut(audioRef.current);
    }
  }, [isEnabled, fadeOut]);

  // Try to resume audio on user interaction (for autoplay policy)
  const resumeAudio = useCallback(() => {
    if (audioRef.current && isEnabled && audioRef.current.paused) {
      const audioConfig = getAudioForScene(sceneId);
      const actualVolume = (volume / 100) * (audioConfig.volumePreset / 100);
      audioRef.current.volume = actualVolume;
      audioRef.current.play().catch(() => {});
    }
  }, [isEnabled, sceneId, volume]);

  return { resumeAudio };
}
