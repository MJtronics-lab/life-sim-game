import { useState, useCallback } from 'react';
import type { Activity, TimeOfDay, FitnessLevel } from '../../types';
import { scenes } from '../../data/scenes';
import { getActivitiesForScene } from '../../data/activities';
import { getActivityImage } from '../../data/activityImages';
import { getTimeOfDay } from '../../utils/time';
import { SceneBackground } from './SceneBackground';
import { Character, getFitnessLevel } from './Character';
import { ActivityPanel } from './ActivityPanel';
import { SceneSelector } from './SceneSelector';

interface SceneProps {
  sceneId: string;
  currentHour: number;
  fitnessValue: number;
  isAwake: boolean;
  onActivitySelect: (activity: Activity) => void;
  onSceneChange: (sceneId: string) => void;
  onWakeUp: () => void;
  onSleep: () => void;
}

const ACTIVITY_DISPLAY_DURATION = 2000; // 2 seconds

export function Scene({
  sceneId,
  currentHour,
  fitnessValue,
  isAwake,
  onActivitySelect,
  onSceneChange,
  onWakeUp,
  onSleep,
}: SceneProps) {
  const [showSceneSelector, setShowSceneSelector] = useState(false);
  const [activeActivityImage, setActiveActivityImage] = useState<string | null>(null);
  const [isPerformingActivity, setIsPerformingActivity] = useState(false);

  const scene = scenes[sceneId];
  const timeOfDay = getTimeOfDay(currentHour) as TimeOfDay;
  const fitnessLevel = getFitnessLevel(fitnessValue) as FitnessLevel;

  // Handle activity with animation
  const handleActivitySelect = useCallback((activity: Activity) => {
    const activityImage = getActivityImage(activity.id);

    if (activityImage) {
      setActiveActivityImage(activityImage);
      setIsPerformingActivity(true);

      // Show activity image, then perform activity
      setTimeout(() => {
        setIsPerformingActivity(false);
        setActiveActivityImage(null);
        onActivitySelect(activity);
      }, ACTIVITY_DISPLAY_DURATION);
    } else {
      // No image, just perform activity
      onActivitySelect(activity);
    }
  }, [onActivitySelect]);

  // Get activities for current scene and filter by time
  const allActivities = getActivitiesForScene(sceneId);
  const availableActivities = allActivities.filter((activity) => {
    if (!activity.availableTimeOfDay) return true;
    return activity.availableTimeOfDay.includes(timeOfDay);
  });

  if (!scene) {
    return <div className="text-center py-8">Szene nicht gefunden</div>;
  }

  return (
    <div className="relative h-full min-h-[600px]">
      {/* Background */}
      <SceneBackground backgroundImage={scene.backgroundImage} sceneName={scene.name} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Scene Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-primary">{scene.name}</h1>
          <button
            onClick={() => setShowSceneSelector(true)}
            className="bg-bg-card/80 hover:bg-bg-card px-4 py-2 rounded-lg text-text-primary transition-colors"
            disabled={!isAwake}
          >
            📍 Ort wechseln
          </button>
        </div>

        {/* Character Display / Activity Image */}
        <div className="flex-1 flex items-center justify-center py-8">
          {isPerformingActivity && activeActivityImage ? (
            <div className="relative animate-fade-in">
              <img
                src={activeActivityImage}
                alt="Aktivität"
                className="max-h-80 w-auto object-contain drop-shadow-2xl"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-accent/90 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                Wird ausgeführt...
              </div>
            </div>
          ) : (
            <Character fitnessLevel={fitnessLevel} outfit={scene.characterOutfit} />
          )}
        </div>

        {/* Activity Panel */}
        <div className="bg-bg-secondary/90 backdrop-blur-sm rounded-2xl p-6 max-h-80 overflow-y-auto">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Aktivitäten
          </h2>

          {!isAwake ? (
            <div className="space-y-4">
              <p className="text-text-secondary text-center py-4">
                💤 Du schläfst gerade...
              </p>
              <button
                onClick={onWakeUp}
                disabled={isPerformingActivity}
                className="w-full bg-accent hover:bg-accent/80 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50"
              >
                🌅 Aufwachen
              </button>
            </div>
          ) : timeOfDay === 'night' && sceneId === 'bedroom' ? (
            <div className="space-y-4">
              <ActivityPanel
                activities={availableActivities.filter((a) => a.id !== 'sleep')}
                onActivitySelect={handleActivitySelect}
                disabled={isPerformingActivity}
              />
              <button
                onClick={onSleep}
                disabled={isPerformingActivity}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50"
              >
                🌙 Schlafen gehen
              </button>
            </div>
          ) : (
            <ActivityPanel
              activities={availableActivities}
              onActivitySelect={handleActivitySelect}
              disabled={isPerformingActivity}
            />
          )}
        </div>
      </div>

      {/* Scene Selector Modal */}
      <SceneSelector
        currentSceneId={sceneId}
        timeOfDay={timeOfDay}
        onSceneSelect={onSceneChange}
        isOpen={showSceneSelector}
        onClose={() => setShowSceneSelector(false)}
      />
    </div>
  );
}
