import type { GroceryCategory, GroceryItem, Recipe } from '../types';
import { CATEGORIES } from './categorizer';

const STORAGE_KEYS = {
  ITEMS: 'grocery_app_items_v1',
  RECIPES: 'grocery_app_recipes_v1',
  SETTINGS: 'grocery_app_settings_v1',
};

export interface AppSettings {
  hideChecked: boolean;
  hapticFeedback: boolean;
  keepScreenAwake: boolean;
  groupByCategory: boolean;
  compactMode: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  hideChecked: false,
  hapticFeedback: true,
  keepScreenAwake: false,
  groupByCategory: true,
  compactMode: false,
};

export function loadItems(): GroceryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ITEMS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load items from localStorage', e);
    return [];
  }
}

export function saveItems(items: GroceryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save items to localStorage', e);
  }
}

export function loadRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECIPES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load recipes from localStorage', e);
    return [];
  }
}

export function saveRecipes(recipes: Recipe[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  } catch (e) {
    console.error('Failed to save recipes to localStorage', e);
  }
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

// Format items into clean shareable text for iMessage / SMS
export function formatListForSharing(items: GroceryItem[]): string {
  if (items.length === 0) return 'My Grocery List is empty.';

  // Group by category
  const groups: Partial<Record<GroceryCategory, GroceryItem[]>> = {};

  items.forEach((item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category]!.push(item);
  });

  const lines: string[] = ['🛒 GROCERY SHOPPING LIST', ''];

  for (const [category, catItems] of Object.entries(groups) as [GroceryCategory, GroceryItem[]][]) {
    const catInfo = CATEGORIES[category];
    const emoji = catInfo ? catInfo.emoji : '📦';
    lines.push(`${emoji} ${category.toUpperCase()}`);

    catItems.forEach((item) => {
      const check = item.checked ? '✓' : '•';
      const qty = item.quantity ? `${item.quantity} ` : '';
      const unit = item.unit ? `${item.unit} ` : '';
      const notes = item.notes ? ` (${item.notes})` : '';
      lines.push(`  ${check} ${qty}${unit}${item.name}${notes}`);
    });
    lines.push('');
  }

  return lines.join('\n').trim();
}
