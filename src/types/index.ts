// ==================== STATS ====================

export interface SubStat {
  id: string;
  name: string;
  currentValue: number;
  target?: number;
  unit?: string;
}

export interface Stat {
  id: string;
  name: string;
  icon: string;
  currentValue: number;
  decayRate: number; // Punkte pro Tag Inaktivität
  color: string;
  subStats?: SubStat[];
  lastActivityTime?: number; // Timestamp der letzten Aktivität
}

// ==================== SCENES ====================

export type TimeOfDay = 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface Scene {
  id: string;
  name: string;
  backgroundImage: string; // Gradient-Klasse oder Bild-URL
  characterOutfit: string;
  availableTimeOfDay: TimeOfDay[];
}

// ==================== ACTIVITIES ====================

export interface StatEffect {
  statId: string;
  subStatId?: string;
  change: number;
}

export interface Requirement {
  type: 'stat' | 'time' | 'item';
  statId?: string;
  minValue?: number;
  timeOfDay?: TimeOfDay[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number; // In Spielminuten
  sceneId: string;
  statEffects: StatEffect[];
  requirements?: Requirement[];
  cooldown?: number; // Minuten bis wieder verfügbar
  availableTimeOfDay?: TimeOfDay[];
  lastUsed?: number; // Timestamp
}

// ==================== GOALS ====================

export interface Milestone {
  id: string;
  name: string;
  targetValue: number;
  achieved: boolean;
  achievedDate?: string;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: string;
  relatedStatId: string;
  relatedSubStatId?: string;
  milestones: Milestone[];
  icon: string;
}

// ==================== ACHIEVEMENTS ====================

export type AchievementConditionType =
  | 'stat_reached'
  | 'streak'
  | 'milestone_reached'
  | 'activity_count';

export interface AchievementCondition {
  type: AchievementConditionType;
  statId?: string;
  subStatId?: string;
  targetValue?: number;
  activityId?: string;
  days?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: AchievementCondition;
  unlocked: boolean;
  unlockedDate?: string;
}

// ==================== GAME TIME ====================

export interface GameTime {
  currentDay: number;
  currentHour: number;
  currentMinute: number;
  realStartDate: string;
  gameStartAge: number; // 27.8
}

// ==================== GAME STATE ====================

export interface ActivityLog {
  activityId: string;
  timestamp: number;
  day: number;
}

export interface DailyPrayers {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface GameState {
  // Core State
  stats: Record<string, Stat>;
  currentSceneId: string;
  gameTime: GameTime;

  // Progress
  goals: Record<string, Goal>;
  achievements: Record<string, Achievement>;

  // Tracking
  activityLog: ActivityLog[];
  dailyPrayers: DailyPrayers;
  streaks: Record<string, number>; // statId -> days

  // UI State
  showAchievementPopup: boolean;
  lastUnlockedAchievement?: Achievement;
  isAwake: boolean;
}

// ==================== CHARAKTER ====================

export type FitnessLevel = 1 | 2 | 3 | 4;

export interface CharacterState {
  fitnessLevel: FitnessLevel;
  currentOutfit: string;
}

// ==================== HELPER TYPES ====================

export type StatId = 'deen' | 'fitness' | 'business' | 'fuehrerschein';

export type SceneId =
  | 'bedroom'
  | 'prayer_room'
  | 'warehouse'
  | 'home_office'
  | 'gym'
  | 'driving_school';
