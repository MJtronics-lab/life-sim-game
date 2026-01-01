import type { Goal, Milestone, Achievement, Stat } from '../types';

export function updateGoalProgress(
  goal: Goal,
  newValue: number
): { updatedGoal: Goal; newlyAchievedMilestones: Milestone[] } {
  const newlyAchievedMilestones: Milestone[] = [];

  const updatedMilestones = goal.milestones.map((milestone) => {
    if (!milestone.achieved && newValue >= milestone.targetValue) {
      newlyAchievedMilestones.push({
        ...milestone,
        achieved: true,
        achievedDate: new Date().toISOString(),
      });
      return {
        ...milestone,
        achieved: true,
        achievedDate: new Date().toISOString(),
      };
    }
    return milestone;
  });

  return {
    updatedGoal: {
      ...goal,
      currentValue: newValue,
      milestones: updatedMilestones,
    },
    newlyAchievedMilestones,
  };
}

export function checkAchievementCondition(
  achievement: Achievement,
  stats: Record<string, Stat>,
  streaks: Record<string, number>,
  activityCounts: Record<string, number>
): boolean {
  const { condition } = achievement;

  switch (condition.type) {
    case 'stat_reached': {
      const stat = stats[condition.statId!];
      if (!stat) return false;

      if (condition.subStatId) {
        const subStat = stat.subStats?.find((s) => s.id === condition.subStatId);
        return subStat ? subStat.currentValue >= (condition.targetValue || 0) : false;
      }

      return stat.currentValue >= (condition.targetValue || 0);
    }

    case 'streak': {
      const streakKey = condition.activityId || condition.statId || '';
      return (streaks[streakKey] || 0) >= (condition.days || 0);
    }

    case 'milestone_reached': {
      const stat = stats[condition.statId!];
      if (!stat) return false;

      if (condition.subStatId) {
        const subStat = stat.subStats?.find((s) => s.id === condition.subStatId);
        return subStat ? subStat.currentValue >= (condition.targetValue || 0) : false;
      }

      return stat.currentValue >= (condition.targetValue || 0);
    }

    case 'activity_count': {
      const count = activityCounts[condition.activityId || ''] || 0;
      return count >= (condition.targetValue || 0);
    }

    default:
      return false;
  }
}

export function calculateGoalPercentage(goal: Goal): number {
  return Math.min(100, (goal.currentValue / goal.targetValue) * 100);
}
