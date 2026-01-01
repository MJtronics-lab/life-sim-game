interface SceneBackgroundProps {
  backgroundClass: string;
  sceneName: string;
}

export function SceneBackground({ backgroundClass, sceneName }: SceneBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${backgroundClass} opacity-80`}
      aria-label={`Szene: ${sceneName}`}
    >
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
    </div>
  );
}
