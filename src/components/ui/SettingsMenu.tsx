interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onResetGame: () => void;
}

export function SettingsMenu({ isOpen, onClose, onResetGame }: SettingsMenuProps) {
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
      <div className="bg-bg-secondary rounded-2xl p-6 max-w-md w-full animate-bounce-in">
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
          Version 1.0.0 • Made with ❤️
        </div>
      </div>
    </div>
  );
}
