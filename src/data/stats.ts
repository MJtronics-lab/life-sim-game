import type { Stat } from '../types';

// Stat icons
import deenIcon from '../assets/icons/deen.png';
import fitnessIcon from '../assets/icons/fitness.png';
import businessIcon from '../assets/icons/business.png';
import fuehrerscheinIcon from '../assets/icons/fuehrerschein.png';

export const initialStats: Record<string, Stat> = {
  deen: {
    id: 'deen',
    name: 'Deen',
    icon: deenIcon,
    currentValue: 50,
    decayRate: 5,
    color: 'deen',
    subStats: [
      { id: 'prayer', name: 'Gebet', currentValue: 0, target: 5, unit: 'x täglich' },
      { id: 'quran', name: 'Koran', currentValue: 0, target: 6236, unit: 'Verse' },
      { id: 'arabic', name: 'Arabisch', currentValue: 0, target: 100, unit: 'Level' },
    ],
  },
  fitness: {
    id: 'fitness',
    name: 'Fitness',
    icon: fitnessIcon,
    currentValue: 50,
    decayRate: 3,
    color: 'fitness',
    subStats: [
      { id: 'weight', name: 'Gewicht', currentValue: 68, target: 76, unit: 'kg' },
      { id: 'bench', name: 'Bankdrücken', currentValue: 50, target: 100, unit: 'kg' },
      { id: 'squat', name: 'Kniebeugen', currentValue: 60, target: 150, unit: 'kg' },
    ],
  },
  business: {
    id: 'business',
    name: 'Business',
    icon: businessIcon,
    currentValue: 50,
    decayRate: 2,
    color: 'business',
    subStats: [
      { id: 'wealth', name: 'Vermögen', currentValue: 50000, target: 1000000, unit: '€' },
      { id: 'revenue', name: 'Monatsumsatz', currentValue: 15000, target: 100000, unit: '€' },
    ],
  },
  fuehrerschein: {
    id: 'fuehrerschein',
    name: 'Führerschein',
    icon: fuehrerscheinIcon,
    currentValue: 20,
    decayRate: 1,
    color: 'fuehrerschein',
    subStats: [
      { id: 'lessons', name: 'Fahrstunden', currentValue: 5, target: 30, unit: 'Stunden' },
      { id: 'theory', name: 'Theorie', currentValue: 40, target: 100, unit: '%' },
    ],
  },
};
