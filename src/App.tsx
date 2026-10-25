import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { GroceryItem, Recipe, ViewMode } from './types';
import {
  loadItems,
  saveItems,
  loadRecipes,
  saveRecipes,
  loadSettings,
  saveSettings,
} from './utils/storage';
import type { AppSettings } from './utils/storage';
import { requestWakeLock, releaseWakeLock, handleVisibilityChange } from './utils/wakeLock';
import { Header } from './components/Header';
import { ShoppingView } from './components/ShoppingView';
import { QuickAddItem } from './components/QuickAddItem';
import { PasteRecipeModal } from './components/PasteRecipeModal';
import { RecipeManagerModal } from './components/RecipeManagerModal';
import { ShareModal } from './components/ShareModal';
import { SuggestedFeaturesModal } from './components/SuggestedFeaturesModal';

export function App() {
  const [items, setItems] = useState<GroceryItem[]>(() => loadItems());
  const [recipes, setRecipes] = useState<Recipe[]>(() => loadRecipes());
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [viewMode, setViewMode] = useState<ViewMode>('byAisle');

  // Modal open states
  const [isPasteOpen, setIsPasteOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  // Wake lock
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Auto-save items
  useEffect(() => {
    saveItems(items);
  }, [items]);

  // Auto-save recipes
  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  // Auto-save settings
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Manage visibility change for wake lock
  useEffect(() => {
    const cleanup = handleVisibilityChange(settings.keepScreenAwake, (active) => {
      setWakeLockActive(active);
    });
    return cleanup;
  }, [settings.keepScreenAwake]);

  const toggleWakeLock = async () => {
    if (wakeLockActive) {
      await releaseWakeLock();
      setWakeLockActive(false);
      setSettings((s) => ({ ...s, keepScreenAwake: false }));
    } else {
      const success = await requestWakeLock();
      setWakeLockActive(success);
      setSettings((s) => ({ ...s, keepScreenAwake: success }));
    }
  };

  // Toggle Item Checked
  const handleToggleItem = (id: string) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );

      // Check if all items are now checked (celebration!)
      const total = next.length;
      const checkedCount = next.filter((i) => i.checked).length;
      if (total > 0 && checkedCount === total) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      }

      return next;
    });
  };

  // Add parsed items from modal
  const handleAddItems = (newItems: GroceryItem[], recipe?: Recipe, replaceAll = false) => {
    if (replaceAll) {
      setItems(newItems);
      if (recipe) {
        setRecipes([recipe]);
      }
    } else {
      setItems((prev) => [...prev, ...newItems]);
      if (recipe) {
        setRecipes((prev) => [recipe, ...prev]);
      }
    }
  };

  // Quick Add single item
  const handleQuickAdd = (item: GroceryItem) => {
    setItems((prev) => [item, ...prev]);
  };

  // Update item
  const handleUpdateItem = (updated: GroceryItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear checked
  const handleClearChecked = () => {
    if (window.confirm('Delete all checked items from list?')) {
      setItems((prev) => prev.filter((item) => !item.checked));
    }
  };

  // Uncheck all
  const handleUncheckAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  };

  // Toggle Recipe active status
  const handleToggleRecipe = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, active: !r.active } : r))
    );
  };

  // Delete Recipe
  const handleDeleteRecipe = (recipeId: string) => {
    if (window.confirm('Delete this recipe and all of its ingredients from shopping list?')) {
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
      setItems((prev) => prev.filter((i) => i.recipeId !== recipeId));
    }
  };

  // Filter items: only include items if they either don't have a recipe, or their recipe is active
  const activeRecipeIds = new Set(recipes.filter((r) => r.active).map((r) => r.id));
  const activeItems = items.filter((item) => {
    if (!item.recipeId) return true;
    return activeRecipeIds.has(item.recipeId);
  });

  const checkedCount = activeItems.filter((i) => i.checked).length;
  const totalCount = activeItems.length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col pb-24 transition-colors">
      
      {/* Top Header */}
      <Header
        totalCount={totalCount}
        checkedCount={checkedCount}
        wakeLockActive={wakeLockActive}
        onToggleWakeLock={toggleWakeLock}
        onOpenPasteModal={() => setIsPasteOpen(true)}
        onOpenRecipesModal={() => setIsRecipesOpen(true)}
        onOpenShareModal={() => setIsShareOpen(true)}
        onOpenFeaturesModal={() => setIsFeaturesOpen(true)}
        recipeCount={recipes.length}
      />

      {/* Main shopping container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3.5 py-4">
        <ShoppingView
          items={activeItems}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          hideChecked={settings.hideChecked}
          onToggleHideChecked={() =>
            setSettings((s) => ({ ...s, hideChecked: !s.hideChecked }))
          }
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem}
          onClearChecked={handleClearChecked}
          onUncheckAll={handleUncheckAll}
          onOpenPasteModal={() => setIsPasteOpen(true)}
          hapticEnabled={settings.hapticFeedback}
        />
      </main>

      {/* Floating Bottom Quick-Add Bar (Fixed on mobile iPhone bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 z-20">
        <div className="max-w-2xl mx-auto">
          <QuickAddItem onAddItem={handleQuickAdd} />
        </div>
      </div>

      {/* Modals */}
      <PasteRecipeModal
        isOpen={isPasteOpen}
        onClose={() => setIsPasteOpen(false)}
        onAddItems={handleAddItems}
      />

      <RecipeManagerModal
        isOpen={isRecipesOpen}
        onClose={() => setIsRecipesOpen(false)}
        recipes={recipes}
        onToggleRecipe={handleToggleRecipe}
        onDeleteRecipe={handleDeleteRecipe}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        items={activeItems}
      />

      <SuggestedFeaturesModal
        isOpen={isFeaturesOpen}
        onClose={() => setIsFeaturesOpen(false)}
      />

    </div>
  );
}

export default App;
