import { useState } from 'react';
import type { Activity, TimeOfDay, FitnessLevel } from '../../types';
import { scenes } from '../../data/scenes';
import { getActivitiesForScene } from '../../data/activities';
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

  const scene = scenes[sceneId];
  const timeOfDay = getTimeOfDay(currentHour) as TimeOfDay;
  const fitnessLevel = getFitnessLevel(fitnessValue) as FitnessLevel;

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
      <SceneBackground backgroundClass={scene.backgroundImage} sceneName={scene.name} />

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

        {/* Character Display */}
        <div className="flex-1 flex items-center justify-center py-8">
          <Character fitnessLevel={fitnessLevel} outfit={scene.characterOutfit} />
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
                className="w-full bg-accent hover:bg-accent/80 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                🌅 Aufwachen
              </button>
            </div>
          ) : timeOfDay === 'night' && sceneId === 'bedroom' ? (
            <div className="space-y-4">
              <ActivityPanel
                activities={availableActivities.filter((a) => a.id !== 'sleep')}
                onActivitySelect={onActivitySelect}
              />
              <button
                onClick={onSleep}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                🌙 Schlafen gehen
              </button>
            </div>
          ) : (
            <ActivityPanel
              activities={availableActivities}
              onActivitySelect={onActivitySelect}
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
