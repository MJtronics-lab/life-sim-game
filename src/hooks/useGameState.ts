import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameState,
  Achievement,
  Activity,
  ActivityLog,
  DailyPrayers,
} from '../types';
import { initialStats } from '../data/stats';
import { initialGoals } from '../data/goals';
import { initialAchievements } from '../data/achievements';
import { createInitialGameTime, advanceGameTime, getTimeOfDay } from '../utils/time';
import { applyDecayToStats } from '../utils/decay';
import { updateGoalProgress, checkAchievementCondition } from '../utils/progress';

interface GameStore extends GameState {
  // Actions
  performActivity: (activity: Activity) => void;
  changeScene: (sceneId: string) => void;
  endDay: () => void;
  wakeUp: () => void;
  dismissAchievement: () => void;
  resetGame: () => void;

  // Helpers
  getTimeOfDay: () => string;
  canPerformActivity: (activity: Activity) => boolean;
}

const initialPrayers: DailyPrayers = {
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
};

const createInitialState = (): GameState => ({
  stats: initialStats,
  currentSceneId: 'bedroom',
  gameTime: createInitialGameTime(),
  goals: initialGoals,
  achievements: initialAchievements,
  activityLog: [],
  dailyPrayers: { ...initialPrayers },
  streaks: {},
  showAchievementPopup: false,
  lastUnlockedAchievement: undefined,
  isAwake: false,
});

export const useGameState = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      performActivity: (activity: Activity) => {
        const state = get();
        if (!state.isAwake && activity.id !== 'wake_up') return;

        // Advance time
        const { newTime } = advanceGameTime(state.gameTime, activity.duration);

        // Apply stat effects
        const updatedStats = { ...state.stats };
        for (const effect of activity.statEffects) {
          const stat = updatedStats[effect.statId];
          if (!stat) continue;

          if (effect.subStatId) {
            // Update substat
            const subStatIndex = stat.subStats?.findIndex((s) => s.id === effect.subStatId);
            if (subStatIndex !== undefined && subStatIndex >= 0 && stat.subStats) {
              stat.subStats[subStatIndex] = {
                ...stat.subStats[subStatIndex],
                currentValue: stat.subStats[subStatIndex].currentValue + effect.change,
              };
            }
          } else {
            // Update main stat
            stat.currentValue = Math.min(100, Math.max(0, stat.currentValue + effect.change));
          }

          stat.lastActivityTime = Date.now();
          updatedStats[effect.statId] = { ...stat };
        }

        // Update goals based on substats
        const updatedGoals = { ...state.goals };
        for (const [goalId, goal] of Object.entries(updatedGoals)) {
          if (goal.relatedSubStatId) {
            const stat = updatedStats[goal.relatedStatId];
            const subStat = stat?.subStats?.find((s) => s.id === goal.relatedSubStatId);
            if (subStat) {
              const { updatedGoal } = updateGoalProgress(goal, subStat.currentValue);
              updatedGoals[goalId] = updatedGoal;
            }
          }
        }

        // Track prayer activities
        const updatedPrayers = { ...state.dailyPrayers };
        if (activity.id === 'pray_fajr') updatedPrayers.fajr = true;
        if (activity.id === 'pray_dhuhr') updatedPrayers.dhuhr = true;
        if (activity.id === 'pray_asr') updatedPrayers.asr = true;
        if (activity.id === 'pray_maghrib') updatedPrayers.maghrib = true;
        if (activity.id === 'pray_isha') updatedPrayers.isha = true;

        // Log activity
        const newLog: ActivityLog = {
          activityId: activity.id,
          timestamp: Date.now(),
          day: newTime.currentDay,
        };

        // Check achievements
        const updatedAchievements = { ...state.achievements };
        let newUnlockedAchievement: Achievement | undefined;
        const activityCounts: Record<string, number> = {};

        // Count activities
        for (const log of [...state.activityLog, newLog]) {
          activityCounts[log.activityId] = (activityCounts[log.activityId] || 0) + 1;
        }

        // Check all prayers done
        const allPrayersDone = Object.values(updatedPrayers).every((p) => p);
        if (allPrayersDone) {
          activityCounts['daily_prayers'] = 5;
        }

        for (const [achievementId, achievement] of Object.entries(updatedAchievements)) {
          if (achievement.unlocked) continue;

          if (
            checkAchievementCondition(
              achievement,
              updatedStats,
              state.streaks,
              activityCounts
            )
          ) {
            updatedAchievements[achievementId] = {
              ...achievement,
              unlocked: true,
              unlockedDate: new Date().toISOString(),
            };
            newUnlockedAchievement = updatedAchievements[achievementId];
          }
        }

        set({
          stats: updatedStats,
          goals: updatedGoals,
          gameTime: newTime,
          dailyPrayers: updatedPrayers,
          activityLog: [...state.activityLog, newLog],
          achievements: updatedAchievements,
          showAchievementPopup: !!newUnlockedAchievement,
          lastUnlockedAchievement: newUnlockedAchievement,
        });
      },

      changeScene: (sceneId: string) => {
        set({ currentSceneId: sceneId });
      },

      endDay: () => {
        const state = get();

        // Apply decay
        const decayedStats = applyDecayToStats(state.stats);

        // Update streaks
        const updatedStreaks = { ...state.streaks };

        // Check if all prayers were done
        const allPrayersDone = Object.values(state.dailyPrayers).every((p) => p);
        if (allPrayersDone) {
          updatedStreaks['pray_fajr'] = (updatedStreaks['pray_fajr'] || 0) + 1;
        } else {
          updatedStreaks['pray_fajr'] = 0;
        }

        // Check stat activities
        for (const [statId, stat] of Object.entries(state.stats)) {
          if (stat.lastActivityTime) {
            updatedStreaks[statId] = (updatedStreaks[statId] || 0) + 1;
          } else {
            updatedStreaks[statId] = 0;
          }
        }

        // Advance to next morning
        const newTime = {
          ...state.gameTime,
          currentDay: state.gameTime.currentDay + 1,
          currentHour: 6,
          currentMinute: 0,
        };

        set({
          stats: decayedStats,
          gameTime: newTime,
          dailyPrayers: { ...initialPrayers },
          streaks: updatedStreaks,
          currentSceneId: 'bedroom',
          isAwake: false,
        });
      },

      wakeUp: () => {
        set({ isAwake: true });
      },

      dismissAchievement: () => {
        set({
          showAchievementPopup: false,
          lastUnlockedAchievement: undefined,
        });
      },

      resetGame: () => {
        set(createInitialState());
      },

      getTimeOfDay: () => {
        const state = get();
        return getTimeOfDay(state.gameTime.currentHour);
      },

      canPerformActivity: (activity: Activity) => {
        const state = get();
        const currentTimeOfDay = getTimeOfDay(state.gameTime.currentHour);

        // Check time of day
        if (
          activity.availableTimeOfDay &&
          !activity.availableTimeOfDay.includes(currentTimeOfDay)
        ) {
          return false;
        }

        // Check scene
        if (activity.sceneId !== state.currentSceneId) {
          return false;
        }

        // Check cooldown
        if (activity.cooldown && activity.lastUsed) {
          const cooldownEnd = activity.lastUsed + activity.cooldown * 60 * 1000;
          if (Date.now() < cooldownEnd) return false;
        }

        return true;
      },
    }),
    {
      name: 'life-sim-game-storage',
    }
  )
);
