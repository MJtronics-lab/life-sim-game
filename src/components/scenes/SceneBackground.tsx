interface SceneBackgroundProps {
  backgroundImage: string;
  sceneName: string;
}

export function SceneBackground({ backgroundImage, sceneName }: SceneBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <img
        src={backgroundImage}
        alt={`Szene: ${sceneName}`}
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />
    </div>
  );
}
