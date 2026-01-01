import type { FitnessLevel } from '../../types';

// Character images - Sleepwear
import sleepwear1 from '../../assets/character/sleepwear-1.png';
import sleepwear2 from '../../assets/character/sleepwear-2.png';
import sleepwear3 from '../../assets/character/sleepwear-3.png';
import sleepwear4 from '../../assets/character/sleepwear-4.png';

// Character images - Thobe (Prayer clothing)
import thobe1 from '../../assets/character/thobe-1.png';
import thobe2 from '../../assets/character/thobe-2.png';
import thobe3 from '../../assets/character/thobe-3.png';
import thobe4 from '../../assets/character/thobe-4.png';

// Character images - Casual
import casual1 from '../../assets/character/casual-1.png';
import casual2 from '../../assets/character/casual-2.png';
import casual3 from '../../assets/character/casual-3.png';
import casual4 from '../../assets/character/casual-4.png';

// Character images - Sportswear
import sportswear1 from '../../assets/character/sportswear-1.png';
import sportswear2 from '../../assets/character/sportswear-2.png';
import sportswear3 from '../../assets/character/sportswear-3.png';
import sportswear4 from '../../assets/character/sportswear-4.png';

interface CharacterProps {
  fitnessLevel: FitnessLevel;
  outfit: string;
}

const fitnessDescriptions: Record<FitnessLevel, string> = {
  1: 'Dünn',
  2: 'Normal',
  3: 'Athletisch',
  4: 'Muskulös',
};

const characterImages: Record<string, Record<FitnessLevel, string>> = {
  sleepwear: {
    1: sleepwear1,
    2: sleepwear2,
    3: sleepwear3,
    4: sleepwear4,
  },
  thobe: {
    1: thobe1,
    2: thobe2,
    3: thobe3,
    4: thobe4,
  },
  casual: {
    1: casual1,
    2: casual2,
    3: casual3,
    4: casual4,
  },
  sportswear: {
    1: sportswear1,
    2: sportswear2,
    3: sportswear3,
    4: sportswear4,
  },
};

export function Character({ fitnessLevel, outfit }: CharacterProps) {
  const description = fitnessDescriptions[fitnessLevel];
  const outfitImages = characterImages[outfit] || characterImages.casual;
  const imageSrc = outfitImages[fitnessLevel];

  return (
    <div className="flex flex-col items-center">
      {/* Character Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={`Charakter - ${outfit} - ${description}`}
          className="h-64 w-auto object-contain drop-shadow-2xl transition-all duration-500"
        />
      </div>

      {/* Fitness Label */}
      <div className="mt-4 text-xs text-text-secondary bg-bg-card/80 px-3 py-1.5 rounded-full">
        {description}
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
