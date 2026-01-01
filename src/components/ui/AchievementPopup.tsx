import type { Achievement } from '../../types';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-2xl p-8 max-w-md w-full text-center animate-bounce-in">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-xl font-bold text-warning mb-2">ACHIEVEMENT UNLOCKED!</h2>

        <div className="bg-bg-card rounded-xl p-6 my-6">
          <span className="text-5xl block mb-3">{achievement.icon}</span>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            "{achievement.name}"
          </h3>
          <p className="text-text-secondary">{achievement.description}</p>
        </div>

        <button
          onClick={onClose}
          className="bg-accent hover:bg-accent/80 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
