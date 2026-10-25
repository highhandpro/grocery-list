export type GroceryCategory =
  | 'Produce'
  | 'Meat & Seafood'
  | 'Dairy & Eggs'
  | 'Bakery & Bread'
  | 'Pantry & Grains'
  | 'Canned & Jarred'
  | 'Spices & Condiments'
  | 'Frozen'
  | 'Beverages'
  | 'Snacks & Sweets'
  | 'Household & Personal'
  | 'Other';

export interface CategoryInfo {
  name: GroceryCategory;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface GroceryItem {
  id: string;
  recipeId?: string;
  recipeName?: string;
  rawText: string;
  name: string;
  quantity?: string;
  unit?: string;
  notes?: string;
  category: GroceryCategory;
  checked: boolean;
  createdAt: number;
}

export interface Recipe {
  id: string;
  title: string;
  rawIngredients: string;
  itemCount: number;
  createdAt: number;
  active: boolean; // if active, its items appear in shopping list
}

export type ViewMode = 'byAisle' | 'all' | 'byRecipe';
