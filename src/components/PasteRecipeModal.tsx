import React, { useState } from 'react';
import { SAMPLE_RECIPES } from '../data/sampleRecipes';
import { parseIngredientsBlock } from '../utils/parser';
import { CATEGORIES } from '../utils/categorizer';
import type { GroceryItem, Recipe } from '../types';
import { Clipboard, Sparkles, X, PlusCircle } from 'lucide-react';

interface PasteRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: GroceryItem[], recipe?: Recipe, replaceAll?: boolean) => void;
}

export const PasteRecipeModal: React.FC<PasteRecipeModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [replaceCurrent, setReplaceCurrent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRawText(text);
        setErrorMsg('');
      }
    } catch (e) {
      setErrorMsg('Please tap in the box below and select Paste.');
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_RECIPES[0]) => {
    setRecipeTitle(sample.title);
    setRawText(sample.ingredients);
    setErrorMsg('');
  };

  const previewItems = rawText.trim() ? parseIngredientsBlock(rawText) : [];

  const handleImport = () => {
    if (!rawText.trim()) {
      setErrorMsg('Please paste some ingredients first!');
      return;
    }

    const recipeId = `recipe_${Date.now()}`;
    const title = recipeTitle.trim() || 'Custom Recipe';
    const parsed = parseIngredientsBlock(rawText, recipeId, title);

    if (parsed.length === 0) {
      setErrorMsg('Could not detect any ingredients. Check your formatting.');
      return;
    }

    const recipe: Recipe = {
      id: recipeId,
      title,
      rawIngredients: rawText,
      itemCount: parsed.length,
      createdAt: Date.now(),
      active: true,
    };

    onAddItems(parsed, recipe, replaceCurrent);
    onClose();
    setRecipeTitle('');
    setRawText('');
    setReplaceCurrent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              📋
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Paste Recipe Ingredients
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Auto-sorts by grocery store aisle
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

        {/* Content area */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Quick Sample Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500" /> Or try a quick sample:
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
              {SAMPLE_RECIPES.map((sample) => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-emerald-700 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-300 transition whitespace-nowrap border border-slate-200 dark:border-slate-700"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Recipe Name <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
              placeholder="e.g. Grandma's Lasagna, Taco Night"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Paste Ingredients Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ingredients List
              </label>
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 active:scale-95 transition"
              >
                <Clipboard size={13} /> Paste from Clipboard
              </button>
            </div>
            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                setErrorMsg('');
              }}
              placeholder={`Paste recipe ingredients here, for example:
2 cups all-purpose flour
1 tsp kosher salt
1/2 cup unsalted butter, softened
3 cloves garlic, minced
2 lbs chicken breast`}
              className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>
          )}

          {/* Live Preview & Aisle Badges */}
          {previewItems.length > 0 && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Detected {previewItems.length} items:
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Ready to organize
                </span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {previewItems.map((item, idx) => {
                  const cat = CATEGORIES[item.category] || CATEGORIES.Other;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                    >
                      <span className="truncate pr-2 font-medium text-slate-800 dark:text-slate-200">
                        {item.quantity ? `${item.quantity} ` : ''}
                        {item.unit ? `${item.unit} ` : ''}
                        {item.name}
                        {item.notes ? ` (${item.notes})` : ''}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${cat.bgColor} ${cat.color}`}>
                        {cat.emoji} {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Replace vs Append option */}
          <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={replaceCurrent}
              onChange={(e) => setReplaceCurrent(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Replace entire grocery list (instead of adding to it)</span>
          </label>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={previewItems.length === 0}
            className="flex-2 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white shadow-md active:scale-95 transition"
          >
            <PlusCircle size={18} />
            Add {previewItems.length > 0 ? `${previewItems.length} Items` : 'to List'}
          </button>
        </div>

      </div>
    </div>
  );
};
