import React, { useState } from 'react';
import { parseRawIngredientLine } from '../utils/parser';
import type { GroceryItem } from '../types';
import { Plus } from 'lucide-react';

interface QuickAddItemProps {
  onAddItem: (item: GroceryItem) => void;
}

export const QuickAddItem: React.FC<QuickAddItemProps> = ({ onAddItem }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const parsed = parseRawIngredientLine(trimmed);
    if (parsed) {
      onAddItem(parsed);
      setText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/80"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quick add item (e.g., 2 lemons, paper towels)..."
        className="flex-1 px-3 py-2 text-sm bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 flex items-center justify-center transition active:scale-95 shrink-0"
        aria-label="Add item"
      >
        <Plus size={20} strokeWidth={2.5} />
      </button>
    </form>
  );
};
