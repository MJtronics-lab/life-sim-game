import type { Goal } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';

interface GoalsPanelProps {
  goals: Record<string, Goal>;
}

interface GoalCardProps {
  goal: Goal;
}

function GoalCard({ goal }: GoalCardProps) {
  const progress = (goal.currentValue / goal.targetValue) * 100;
  const completedMilestones = goal.milestones.filter((m) => m.achieved).length;
  const nextMilestone = goal.milestones.find((m) => !m.achieved);

  return (
    <div className="bg-bg-card rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{goal.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold truncate">{goal.name}</h3>
          <div className="text-sm text-text-secondary">
            {typeof goal.currentValue === 'number' && goal.currentValue >= 1000
              ? `${(goal.currentValue / 1000).toFixed(0)}k`
              : goal.currentValue}
            {goal.unit && ` ${goal.unit}`}
            <span className="text-text-muted">
              {' / '}
              {goal.targetValue >= 1000
                ? `${(goal.targetValue / 1000).toFixed(0)}k`
                : goal.targetValue}
            </span>
          </div>
        </div>
      </div>

      <ProgressBar value={progress} height="sm" color="success" />

      {nextMilestone && (
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-text-muted">
            Nächster: {nextMilestone.name}
          </span>
          <span className="text-text-secondary">
            {completedMilestones}/{goal.milestones.length} ✓
          </span>
        </div>
      )}

      {goal.deadline && (
        <div className="mt-2 text-xs text-text-muted">
          Deadline: {new Date(goal.deadline).toLocaleDateString('de-DE')}
        </div>
      )}
    </div>
  );
}

export function GoalsPanel({ goals }: GoalsPanelProps) {
  const goalOrder = [
    'wealth',
    'drivers_license',
    'weight',
    'bench_press',
    'squat',
    'quran',
    'arabic',
  ];

  return (
    <div className="h-full bg-bg-secondary p-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-text-primary mb-4">Ziele</h2>
      <div className="space-y-3">
        {goalOrder.map((goalId) => {
          const goal = goals[goalId];
          if (!goal) return null;
          return <GoalCard key={goalId} goal={goal} />;
        })}
      </div>
    </div>
  );
}
