import { useAudioStore } from '../../hooks/useAudio';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onResetGame: () => void;
}

export function SettingsMenu({ isOpen, onClose, onResetGame }: SettingsMenuProps) {
  const { isEnabled, volume, setEnabled, setVolume } = useAudioStore();

  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm('Bist du sicher? Alle Fortschritte gehen verloren!')) {
      onResetGame();
      onClose();
    }
  };

  const handleExport = () => {
    const data = localStorage.getItem('life-sim-game-storage');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `life-sim-save-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target?.result as string;
            JSON.parse(data); // Validate JSON
            localStorage.setItem('life-sim-game-storage', data);
            window.location.reload();
          } catch {
            alert('Ungültige Speicherdatei!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-2xl p-6 max-w-md w-full animate-bounce-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Einstellungen</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary p-2"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Audio Settings */}
          <div className="bg-bg-card rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              🎵 Musik
            </h3>

            {/* Music Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Hintergrundmusik</span>
              <button
                onClick={() => setEnabled(!isEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isEnabled ? 'bg-accent' : 'bg-bg-secondary'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Volume Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Lautstärke</span>
                <span className="text-text-primary font-medium">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                disabled={!isEnabled}
                className={`w-full h-2 rounded-full appearance-none cursor-pointer ${
                  isEnabled ? 'bg-bg-secondary' : 'bg-bg-secondary/50'
                }`}
                style={{
                  background: isEnabled
                    ? `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${volume}%, var(--color-bg-secondary) ${volume}%, var(--color-bg-secondary) 100%)`
                    : undefined,
                }}
              />
            </div>

            {/* Audio Status */}
            <p className="text-xs text-text-muted">
              {isEnabled
                ? 'Nasheeds werden automatisch je nach Szene abgespielt.'
                : 'Musik ist deaktiviert.'}
            </p>
          </div>

          {/* Game Info */}
          <div className="bg-bg-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-2">Life Simulation</h3>
            <p className="text-sm text-text-secondary">
              Ein Visual-Novel-Style Life-Simulation-Spiel, in dem du deinen Alltag
              durchlebst und verschiedene Lebensziele verfolgst.
            </p>
          </div>

          {/* Export/Import */}
          <div className="bg-bg-card rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-text-primary">Spielstand</h3>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 bg-accent hover:bg-accent/80 text-white py-2 px-4 rounded-lg transition-colors"
              >
                📤 Exportieren
              </button>
              <button
                onClick={handleImport}
                className="flex-1 bg-bg-secondary hover:bg-bg-primary text-text-primary py-2 px-4 rounded-lg transition-colors border border-bg-card"
              >
                📥 Importieren
              </button>
            </div>
          </div>

          {/* Reset */}
          <div className="bg-bg-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-2">Gefahrenzone</h3>
            <button
              onClick={handleReset}
              className="w-full bg-danger hover:bg-danger/80 text-white py-2 px-4 rounded-lg transition-colors"
            >
              🗑️ Spiel zurücksetzen
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-text-muted">
          Version 1.1.0 • Made with ❤️
        </div>
      </div>
    </div>
  );
}
