import React from 'react';
import { Zap, ZapOff, Plus, BookOpen, Share2, Lightbulb, CheckCheck } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  checkedCount: number;
  wakeLockActive: boolean;
  onToggleWakeLock: () => void;
  onOpenPasteModal: () => void;
  onOpenRecipesModal: () => void;
  onOpenShareModal: () => void;
  onOpenFeaturesModal: () => void;
  recipeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  checkedCount,
  wakeLockActive,
  onToggleWakeLock,
  onOpenPasteModal,
  onOpenRecipesModal,
  onOpenShareModal,
  onOpenFeaturesModal,
  recipeCount,
}) => {
  const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-2xl mx-auto px-4 pt-3 pb-2.5">
        
        {/* Top row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-sm">
              <span className="text-xl">🛒</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  GroceryCart
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                  Mobile
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Recipe Paste & Aisle Checklist
              </p>
            </div>
          </div>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Wake Lock Toggle */}
            <button
              onClick={onToggleWakeLock}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                wakeLockActive
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-xs animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title={wakeLockActive ? 'Screen lock disabled (keeps display on)' : 'Enable keep screen awake'}
            >
              {wakeLockActive ? <Zap size={14} className="fill-amber-500 text-amber-500" /> : <ZapOff size={14} />}
              <span className="hidden xs:inline">{wakeLockActive ? 'Awake' : 'Sleep'}</span>
            </button>

            {/* Recipes Modal Toggle */}
            <button
              onClick={onOpenRecipesModal}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
              title="Manage Saved Recipes"
            >
              <BookOpen size={17} />
              {recipeCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {recipeCount}
                </span>
              )}
            </button>

            {/* Share */}
            <button
              onClick={onOpenShareModal}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
              title="Share shopping list"
            >
              <Share2 size={17} />
            </button>

            {/* Suggested Features Modal */}
            <button
              onClick={onOpenFeaturesModal}
              className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/60 dark:border-amber-800/60 transition active:scale-95"
              title="Suggested Features & Roadmap"
            >
              <Lightbulb size={17} />
            </button>

            {/* Primary Paste Recipe Button */}
            <button
              onClick={onOpenPasteModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Paste</span>
            </button>
          </div>
        </div>

        {/* Progress bar & Shopping cart stats */}
        {totalCount > 0 && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                {percentage === 100 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCheck size={14} /> Shopping Complete!
                  </span>
                ) : (
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">{checkedCount}</strong> of{' '}
                    <strong>{totalCount}</strong> items in cart
                  </span>
                )}
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {percentage}%
              </span>
            </div>
            
            {/* Visual Progress Track */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
