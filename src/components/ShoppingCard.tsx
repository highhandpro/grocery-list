import React, { useState } from 'react';
import type { GroceryCategory, GroceryItem } from '../types';
import { CATEGORIES } from '../utils/categorizer';
import { Check, Edit3, Trash2, X, Save, ExternalLink } from 'lucide-react';

interface ShoppingCardProps {
  item: GroceryItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (item: GroceryItem) => void;
  hapticEnabled: boolean;
}

export const ShoppingCard: React.FC<ShoppingCardProps> = ({
  item,
  onToggle,
  onDelete,
  onUpdate,
  hapticEnabled,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity || '');
  const [unit, setUnit] = useState(item.unit || '');
  const [notes, setNotes] = useState(item.notes || '');
  const [category, setCategory] = useState<GroceryCategory>(item.category);

  const handleToggle = () => {
    if (hapticEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch (e) {
        // ignore
      }
    }
    onToggle(item.id);
  };

  const handleSave = () => {
    onUpdate({
      ...item,
      name: name.trim() || item.name,
      quantity: quantity.trim() || undefined,
      unit: unit.trim() || undefined,
      notes: notes.trim() || undefined,
      category,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-emerald-500/40 mb-2.5 transition-all">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Edit Item
          </span>
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Avocados"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Qty
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 2"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. cups, lbs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Prep / Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. finely chopped, ripe"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Aisle / Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GroceryCategory)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {Object.keys(CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORIES[cat as GroceryCategory].emoji} {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition shadow-sm active:scale-95"
            >
              <Save size={16} /> Save Changes
            </button>
            <a
              href={`https://www.safeway.com/shop/search-results.html?q=${encodeURIComponent(name || item.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-medium text-xs rounded-xl transition border border-red-200 dark:border-red-900"
              title="Search item on Safeway.com"
            >
              <ExternalLink size={14} /> Safeway
            </a>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
              title="Delete item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleToggle}
      className={`group relative flex items-start gap-3.5 p-3.5 rounded-2xl transition-all duration-200 border cursor-pointer select-none mb-2.5 ${
        item.checked
          ? 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
          : 'bg-white dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700'
      }`}
    >
      {/* Big iOS-friendly tap checkbox target */}
      <div className="pt-0.5 flex-shrink-0">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
            item.checked
              ? 'bg-emerald-600 text-white scale-95 shadow-xs'
              : 'border-2 border-slate-300 dark:border-slate-600 group-hover:border-emerald-500 bg-slate-50 dark:bg-slate-900'
          }`}
        >
          {item.checked && <Check size={14} strokeWidth={3} />}
        </div>
      </div>

      {/* Item info */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-baseline flex-wrap gap-x-2">
          {item.quantity && (
            <span
              className={`font-bold text-base ${
                item.checked
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {item.quantity} {item.unit || ''}
            </span>
          )}
          {!item.quantity && item.unit && (
            <span
              className={`font-semibold text-sm ${
                item.checked
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {item.unit}
            </span>
          )}
          <span
            className={`font-medium text-base leading-tight break-words ${
              item.checked
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {item.name}
          </span>
        </div>

        {/* Notes / prep description */}
        {item.notes && (
          <p
            className={`text-xs mt-0.5 italic ${
              item.checked
                ? 'text-slate-400 dark:text-slate-600 line-through'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {item.notes}
          </p>
        )}

        {/* Recipe tag */}
        {item.recipeName && (
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
            <span>📖</span>
            <span className="truncate max-w-[180px]">{item.recipeName}</span>
          </div>
        )}
      </div>

      {/* Edit, Safeway & delete buttons */}
      <div
        className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={`https://www.safeway.com/shop/search-results.html?q=${encodeURIComponent(item.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
          aria-label="Check on Safeway"
          title="Check price & availability on Safeway.com"
        >
          <ExternalLink size={15} />
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
          aria-label="Edit item"
        >
          <Edit3 size={15} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
          aria-label="Delete item"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};
