interface ProgressBarProps {
  value: number;
  maxValue?: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const heightClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const colorClasses: Record<string, string> = {
  deen: 'bg-deen',
  fitness: 'bg-fitness',
  business: 'bg-business',
  fuehrerschein: 'bg-fuehrerschein',
  default: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export function ProgressBar({
  value,
  maxValue = 100,
  color = 'default',
  height = 'md',
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  const isLow = percentage < 30;

  const bgColor = isLow ? colorClasses.danger : colorClasses[color] || colorClasses.default;

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-text-secondary">{label}</span>
          <span className="text-text-primary font-medium">
            {Math.round(value)}/{maxValue}
          </span>
        </div>
      )}
      <div
        className={`w-full bg-bg-card rounded-full overflow-hidden ${heightClasses[height]}`}
      >
        <div
          className={`${heightClasses[height]} ${bgColor} rounded-full ${
            animated ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
