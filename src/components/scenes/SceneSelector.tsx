import type { TimeOfDay } from '../../types';
import { scenes, getAvailableScenes } from '../../data/scenes';

interface SceneSelectorProps {
  currentSceneId: string;
  timeOfDay: TimeOfDay;
  onSceneSelect: (sceneId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SceneSelector({
  currentSceneId,
  timeOfDay,
  onSceneSelect,
  isOpen,
  onClose,
}: SceneSelectorProps) {
  if (!isOpen) return null;

  const availableScenes = getAvailableScenes(timeOfDay);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4">
      <div className="bg-bg-secondary rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Ort wechseln</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary p-2"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.values(scenes).map((scene) => {
            const isAvailable = availableScenes.some((s) => s.id === scene.id);
            const isCurrent = scene.id === currentSceneId;

            return (
              <button
                key={scene.id}
                onClick={() => {
                  if (isAvailable && !isCurrent) {
                    onSceneSelect(scene.id);
                    onClose();
                  }
                }}
                disabled={!isAvailable || isCurrent}
                className={`relative overflow-hidden rounded-xl p-4 text-left transition-all ${
                  isCurrent
                    ? 'ring-2 ring-accent bg-accent/20'
                    : isAvailable
                    ? 'hover:ring-2 hover:ring-accent/50 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div
                  className={`absolute inset-0 ${scene.backgroundImage} opacity-30`}
                />
                <div className="relative z-10">
                  <h3 className="font-semibold text-text-primary">{scene.name}</h3>
                  {isCurrent && (
                    <span className="text-xs text-accent mt-1 block">
                      Aktueller Ort
                    </span>
                  )}
                  {!isAvailable && !isCurrent && (
                    <span className="text-xs text-text-muted mt-1 block">
                      Nicht verfügbar
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
