import React, { useState } from 'react';
import type { GroceryItem, ViewMode } from '../types';
import { CATEGORIES, CATEGORY_ORDER } from '../utils/categorizer';
import { ShoppingCard } from './ShoppingCard';
import {
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Trash,
  Eye,
  EyeOff,
  PlusCircle,
  Layers,
  List,
  BookOpen
} from 'lucide-react';

interface ShoppingViewProps {
  items: GroceryItem[];
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  hideChecked: boolean;
  onToggleHideChecked: () => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: GroceryItem) => void;
  onClearChecked: () => void;
  onUncheckAll: () => void;
  onOpenPasteModal: () => void;
  hapticEnabled: boolean;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  items,
  viewMode,
  onChangeViewMode,
  hideChecked,
  onToggleHideChecked,
  onToggleItem,
  onDeleteItem,
  onUpdateItem,
  onClearChecked,
  onUncheckAll,
  onOpenPasteModal,
  hapticEnabled,
}) => {
  const [collapsedAisles, setCollapsedAisles] = useState<Record<string, boolean>>({});

  const toggleAisleCollapse = (category: string) => {
    setCollapsedAisles((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const checkedItems = items.filter((i) => i.checked);
  const remainingItems = items.filter((i) => !i.checked);

  // Group items according to viewMode
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-4xl mb-4 shadow-xs">
          🛒
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1.5">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
          Paste ingredients from any recipe, food blog, or notes. We'll automatically sort them by grocery store aisle!
        </p>
        <button
          onClick={onOpenPasteModal}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:scale-95 transition"
        >
          <PlusCircle size={18} />
          Paste Recipe Ingredients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
        
        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeViewMode('byAisle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewMode === 'byAisle'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers size={14} />
            <span>By Aisle</span>
          </button>

          <button
            onClick={() => onChangeViewMode('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewMode === 'all'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <List size={14} />
            <span>All Items</span>
          </button>

          <button
            onClick={() => onChangeViewMode('byRecipe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewMode === 'byRecipe'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen size={14} />
            <span>By Recipe</span>
          </button>
        </div>

        {/* Quick List Actions */}
        <div className="flex items-center gap-1">
          {/* Hide Checked Toggle */}
          <button
            onClick={onToggleHideChecked}
            className={`p-1.5 rounded-xl text-xs font-medium transition ${
              hideChecked
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title={hideChecked ? 'Show checked items' : 'Hide checked items'}
          >
            {hideChecked ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          {/* Uncheck All */}
          {checkedItems.length > 0 && (
            <button
              onClick={onUncheckAll}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl transition"
              title="Uncheck all items"
            >
              <RotateCcw size={16} />
            </button>
          )}

          {/* Clear Checked */}
          {checkedItems.length > 0 && (
            <button
              onClick={onClearChecked}
              className="p-1.5 text-slate-500 hover:text-rose-600 rounded-xl transition"
              title="Delete all checked items"
            >
              <Trash size={16} />
            </button>
          )}
        </div>

      </div>

      {/* Render Items by Aisle Mode */}
      {viewMode === 'byAisle' && (
        <div className="space-y-4">
          {CATEGORY_ORDER.map((category) => {
            let catItems = items.filter((i) => i.category === category);
            if (hideChecked) {
              catItems = catItems.filter((i) => !i.checked);
            }
            if (catItems.length === 0) return null;

            const catInfo = CATEGORIES[category];
            const isCollapsed = collapsedAisles[category];
            const catCheckedCount = catItems.filter((i) => i.checked).length;

            return (
              <div
                key={category}
                className="rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 p-3 border border-slate-200/60 dark:border-slate-800"
              >
                {/* Aisle Category Header */}
                <div
                  onClick={() => toggleAisleCollapse(category)}
                  className="flex items-center justify-between cursor-pointer py-1.5 px-2 select-none mb-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{catInfo.emoji}</span>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      {catInfo.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {catCheckedCount > 0 ? `${catCheckedCount}/${catItems.length}` : catItems.length}
                    </span>
                  </div>

                  <div className="text-slate-400">
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Items in this aisle */}
                {!isCollapsed && (
                  <div className="space-y-1">
                    {catItems.map((item) => (
                      <ShoppingCard
                        key={item.id}
                        item={item}
                        onToggle={onToggleItem}
                        onDelete={onDeleteItem}
                        onUpdate={onUpdateItem}
                        hapticEnabled={hapticEnabled}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Render All Items Flat Mode */}
      {viewMode === 'all' && (
        <div className="space-y-1">
          {(hideChecked ? remainingItems : items).map((item) => (
            <ShoppingCard
              key={item.id}
              item={item}
              onToggle={onToggleItem}
              onDelete={onDeleteItem}
              onUpdate={onUpdateItem}
              hapticEnabled={hapticEnabled}
            />
          ))}
        </div>
      )}

      {/* Render By Recipe Mode */}
      {viewMode === 'byRecipe' && (
        <div className="space-y-4">
          {Array.from(new Set(items.map((i) => i.recipeName || 'General Items'))).map((recipeGroup) => {
            let groupItems = items.filter((i) => (i.recipeName || 'General Items') === recipeGroup);
            if (hideChecked) {
              groupItems = groupItems.filter((i) => !i.checked);
            }
            if (groupItems.length === 0) return null;

            return (
              <div
                key={recipeGroup}
                className="rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 p-3 border border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center gap-2 py-1.5 px-2 mb-2 font-bold text-sm text-slate-800 dark:text-slate-200">
                  <span>📖</span>
                  <span>{recipeGroup}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {groupItems.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {groupItems.map((item) => (
                    <ShoppingCard
                      key={item.id}
                      item={item}
                      onToggle={onToggleItem}
                      onDelete={onDeleteItem}
                      onUpdate={onUpdateItem}
                      hapticEnabled={hapticEnabled}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Completed Items Drawer (when not in hideChecked mode and has checked items) */}
      {!hideChecked && checkedItems.length > 0 && viewMode === 'all' && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>In Cart ({checkedItems.length})</span>
            <button
              onClick={onClearChecked}
              className="text-rose-500 hover:text-rose-600 transition"
            >
              Clear Checked
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
