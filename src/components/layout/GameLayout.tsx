import type { ReactNode } from 'react';
import type { GameTime, Stat, Goal } from '../../types';
import { StatsPanel } from './StatsPanel';
import { GoalsPanel } from './GoalsPanel';
import { TimeDisplay } from '../ui/TimeDisplay';

interface GameLayoutProps {
  stats: Record<string, Stat>;
  goals: Record<string, Goal>;
  gameTime: GameTime;
  children: ReactNode;
  onMenuClick?: () => void;
}

export function GameLayout({
  stats,
  goals,
  gameTime,
  children,
  onMenuClick,
}: GameLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-bg-primary">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-bg-card">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <TimeDisplay gameTime={gameTime} />
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-bg-card rounded-lg transition-colors"
            >
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Stats Panel - Left */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-bg-card">
          <StatsPanel stats={stats} />
        </aside>

        {/* Scene Area - Center */}
        <section className="flex-1 overflow-y-auto">{children}</section>

        {/* Goals Panel - Right */}
        <aside className="hidden xl:block w-72 flex-shrink-0 border-l border-bg-card">
          <GoalsPanel goals={goals} />
        </aside>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden flex-shrink-0 border-t border-bg-card bg-bg-secondary">
        <div className="flex justify-around py-2">
          <MobileNavItem icon="📊" label="Stats" />
          <MobileNavItem icon="🎮" label="Spiel" active />
          <MobileNavItem icon="🎯" label="Ziele" />
        </div>
      </nav>
    </div>
  );
}

interface MobileNavItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

function MobileNavItem({ icon, label, active }: MobileNavItemProps) {
  return (
    <button
      className={`flex flex-col items-center px-4 py-1 rounded-lg transition-colors ${
        active ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
