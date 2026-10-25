import React from 'react';
import type { Recipe } from '../types';
import { BookOpen, Trash2, X, CheckCircle2, Circle } from 'lucide-react';

interface RecipeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onToggleRecipe: (id: string) => void;
  onDeleteRecipe: (id: string) => void;
}

export const RecipeManagerModal: React.FC<RecipeManagerModalProps> = ({
  isOpen,
  onClose,
  recipes,
  onToggleRecipe,
  onDeleteRecipe,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Saved Recipes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toggle recipes in or out of your active shopping trip
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Recipe List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5">
          {recipes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                No recipes saved yet.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Tap "+ Paste Recipe" on the home screen to import one!
              </p>
            </div>
          ) : (
            recipes.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 transition"
              >
                <div
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  onClick={() => onToggleRecipe(rec.id)}
                >
                  <button
                    type="button"
                    className="text-slate-400 hover:text-emerald-600 transition"
                  >
                    {rec.active ? (
                      <CheckCircle2 size={22} className="text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle size={22} className="text-slate-300 dark:text-slate-600" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${rec.active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 line-through'}`}>
                      {rec.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {rec.itemCount} ingredients • {new Date(rec.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteRecipe(rec.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                  title="Delete recipe and its items"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
