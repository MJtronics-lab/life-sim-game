import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { GameLayout } from './components/layout/GameLayout';
import { Scene } from './components/scenes/Scene';
import { AchievementPopup } from './components/ui/AchievementPopup';
import { SettingsMenu } from './components/ui/SettingsMenu';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const {
    stats,
    goals,
    gameTime,
    currentSceneId,
    isAwake,
    showAchievementPopup,
    lastUnlockedAchievement,
    performActivity,
    changeScene,
    endDay,
    wakeUp,
    dismissAchievement,
    resetGame,
  } = useGameState();

  return (
    <>
      <GameLayout
        stats={stats}
        goals={goals}
        gameTime={gameTime}
        onMenuClick={() => setShowSettings(true)}
      >
        <Scene
          sceneId={currentSceneId}
          currentHour={gameTime.currentHour}
          fitnessValue={stats.fitness?.currentValue || 50}
          isAwake={isAwake}
          onActivitySelect={performActivity}
          onSceneChange={changeScene}
          onWakeUp={wakeUp}
          onSleep={endDay}
        />
      </GameLayout>

      {/* Settings Menu */}
      <SettingsMenu
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onResetGame={resetGame}
      />

      {/* Achievement Popup */}
      {showAchievementPopup && lastUnlockedAchievement && (
        <AchievementPopup
          achievement={lastUnlockedAchievement}
          onClose={dismissAchievement}
        />
      )}
    </>
  );
}

export default App;
