import type { FitnessLevel } from '../../types';

interface CharacterProps {
  fitnessLevel: FitnessLevel;
  outfit: string;
}

const fitnessStyles: Record<FitnessLevel, { width: string; description: string }> = {
  1: { width: 'w-16', description: 'Dünn' },
  2: { width: 'w-20', description: 'Normal' },
  3: { width: 'w-24', description: 'Athletisch' },
  4: { width: 'w-28', description: 'Muskulös' },
};

const outfitColors: Record<string, string> = {
  sleepwear: 'bg-gray-600',
  thobe: 'bg-white',
  casual: 'bg-blue-600',
  sportswear: 'bg-orange-600',
};

export function Character({ fitnessLevel, outfit }: CharacterProps) {
  const style = fitnessStyles[fitnessLevel];
  const outfitColor = outfitColors[outfit] || 'bg-gray-500';

  return (
    <div className="flex flex-col items-center">
      {/* Character Silhouette */}
      <div className="relative">
        {/* Head */}
        <div className="w-12 h-12 bg-amber-700 rounded-full mb-1 relative">
          {/* Beard */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-5 bg-gray-900 rounded-b-full" />
          {/* Hair */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-900 rounded-t-full" />
        </div>

        {/* Body */}
        <div
          className={`${style.width} h-32 ${outfitColor} rounded-t-lg rounded-b-2xl flex items-center justify-center transition-all duration-500`}
        >
          {/* Arms */}
          <div
            className={`absolute -left-3 top-4 w-3 h-16 ${outfitColor} rounded-l-full`}
          />
          <div
            className={`absolute -right-3 top-4 w-3 h-16 ${outfitColor} rounded-r-full`}
          />
        </div>

        {/* Legs */}
        <div className="flex gap-1 justify-center">
          <div className="w-5 h-12 bg-gray-800 rounded-b-lg" />
          <div className="w-5 h-12 bg-gray-800 rounded-b-lg" />
        </div>
      </div>

      {/* Fitness Label */}
      <div className="mt-4 text-xs text-text-secondary bg-bg-card/80 px-2 py-1 rounded">
        {style.description}
      </div>
    </div>
  );
}

export function getFitnessLevel(fitnessValue: number): FitnessLevel {
  if (fitnessValue <= 25) return 1;
  if (fitnessValue <= 50) return 2;
  if (fitnessValue <= 75) return 3;
  return 4;
}
