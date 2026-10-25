import type { CategoryInfo, GroceryCategory } from '../types';

export const CATEGORIES: Record<GroceryCategory, CategoryInfo> = {
  'Produce': {
    name: 'Produce',
    emoji: '🥬',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  'Meat & Seafood': {
    name: 'Meat & Seafood',
    emoji: '🥩',
    color: 'text-rose-700 dark:text-rose-300',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    borderColor: 'border-rose-200 dark:border-rose-800',
  },
  'Dairy & Eggs': {
    name: 'Dairy & Eggs',
    emoji: '🥛',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  'Bakery & Bread': {
    name: 'Bakery & Bread',
    emoji: '🥖',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  'Pantry & Grains': {
    name: 'Pantry & Grains',
    emoji: '🌾',
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/40',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  'Canned & Jarred': {
    name: 'Canned & Jarred',
    emoji: '🥫',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  'Spices & Condiments': {
    name: 'Spices & Condiments',
    emoji: '🧂',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  'Frozen': {
    name: 'Frozen',
    emoji: '🧊',
    color: 'text-cyan-700 dark:text-cyan-300',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
  },
  'Beverages': {
    name: 'Beverages',
    emoji: '🧃',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  'Snacks & Sweets': {
    name: 'Snacks & Sweets',
    emoji: '🍪',
    color: 'text-pink-700 dark:text-pink-300',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
    borderColor: 'border-pink-200 dark:border-pink-800',
  },
  'Household & Personal': {
    name: 'Household & Personal',
    emoji: '🧼',
    color: 'text-teal-700 dark:text-teal-300',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
    borderColor: 'border-teal-200 dark:border-teal-800',
  },
  'Other': {
    name: 'Other',
    emoji: '📦',
    color: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-900/40',
    borderColor: 'border-slate-200 dark:border-slate-700',
  },
};

export const CATEGORY_ORDER: GroceryCategory[] = [
  'Produce',
  'Meat & Seafood',
  'Dairy & Eggs',
  'Bakery & Bread',
  'Pantry & Grains',
  'Canned & Jarred',
  'Spices & Condiments',
  'Frozen',
  'Beverages',
  'Snacks & Sweets',
  'Household & Personal',
  'Other',
];

// Dictionary of keywords to match
const KEYWORD_MAP: Record<GroceryCategory, string[]> = {
  'Produce': [
    'onion', 'garlic', 'shallot', 'scallion', 'leek', 'chive',
    'tomato', 'potato', 'sweet potato', 'yam', 'carrot', 'celery',
    'lettuce', 'spinach', 'kale', 'arugula', 'cabbage', 'broccoli',
    'cauliflower', 'asparagus', 'zucchini', 'cucumber', 'eggplant',
    'bell pepper', 'pepper', 'jalapeno', 'habanero', 'serrano', 'chili',
    'mushroom', 'ginger', 'cilantro', 'parsley', 'basil', 'mint',
    'rosemary', 'thyme', 'dill', 'oregano (fresh)', 'sage', 'tarragon',
    'lemon', 'lime', 'orange', 'apple', 'banana', 'avocado',
    'berry', 'strawberr', 'blueberr', 'raspberr', 'blackberr',
    'grape', 'peach', 'plum', 'mango', 'pineapple', 'watermelon', 'melon',
    'corn', 'green bean', 'snap pea', 'pea pod', 'artichoke', 'radish',
    'beet', 'squash', 'butternut', 'herb', 'scallions', 'avocados',
    'sprout', 'bok choy', 'fennel', 'lime juice', 'lemon juice', 'zest'
  ],
  'Meat & Seafood': [
    'chicken', 'beef', 'steak', 'pork', 'bacon', 'sausage',
    'turkey', 'ham', 'lamb', 'prosciutto', 'pancetta', 'pepperoni',
    'ground beef', 'ground chicken', 'ground turkey', 'ground pork',
    'salmon', 'tuna', 'shrimp', 'prawn', 'cod', 'halibut', 'tilapia',
    'trout', 'lobster', 'crab', 'scallop', 'mussel', 'clam', 'anchov',
    'ribs', 'tenderloin', 'brisket', 'wings', 'thigh', 'breast', 'cutlet',
    'veal', 'meatball', 'roast beef', 'chorizo', 'filet'
  ],
  'Dairy & Eggs': [
    'milk', 'butter', 'egg', 'cheese', 'parmesan', 'cheddar', 'mozzarella',
    'cream cheese', 'heavy cream', 'sour cream', 'whipping cream', 'half and half',
    'yogurt', 'ricotta', 'feta', 'gouda', 'swiss cheese', 'provolone',
    'cottage cheese', 'brie', 'goat cheese', 'ghee', 'mascarpone',
    'creme fraiche', 'buttermilk', 'egg white', 'egg yolk'
  ],
  'Bakery & Bread': [
    'bread', 'bun', 'buns', 'roll', 'baguette', 'sourdough', 'tortilla',
    'wrap', 'pita', 'naan', 'croissant', 'bagel', 'brioche', 'ciabatta',
    'english muffin', 'flatbread', 'pizza crust', 'toast', 'crust'
  ],
  'Pantry & Grains': [
    'pasta', 'spaghetti', 'penne', 'rigatoni', 'fusilli', 'fettuccine', 'linguine',
    'macaroni', 'noodle', 'lasagna', 'ramen', 'rice', 'jasmine rice', 'basmati',
    'brown rice', 'quinoa', 'couscous', 'oat', 'oatmeal', 'flour', 'all-purpose flour',
    'sugar', 'brown sugar', 'powdered sugar', 'baking powder', 'baking soda',
    'yeast', 'cornstarch', 'cocoa powder', 'chocolate chips', 'vanilla extract',
    'lentil', 'couscous', 'barley', 'breadcrumbs', 'panko', 'cornmeal'
  ],
  'Canned & Jarred': [
    'canned', 'broth', 'stock', 'chicken broth', 'beef broth', 'vegetable broth',
    'tomato paste', 'tomato sauce', 'diced tomato', 'crushed tomato', 'marinara',
    'bean', 'black beans', 'chickpea', 'garbanzo', 'kidney bean', 'cannellini',
    'coconut milk', 'curry paste', 'canned tuna', 'olive', 'olives', 'capers',
    'artichoke hearts', 'peanut butter', 'almond butter', 'jam', 'jelly'
  ],
  'Spices & Condiments': [
    'salt', 'black pepper', 'olive oil', 'vegetable oil', 'canola oil', 'sesame oil',
    'soy sauce', 'fish sauce', 'worcestershire', 'vinegar', 'apple cider vinegar',
    'balsamic', 'hot sauce', 'sriracha', 'ketchup', 'mustard', 'mayo', 'mayonnaise',
    'paprika', 'cumin', 'chili powder', 'garlic powder', 'onion powder', 'cinnamon',
    'nutmeg', 'oregano', 'cayenne', 'bay leaf', 'bay leaves', 'turmeric', 'coriander',
    'cardamom', 'clove', 'bbq sauce', 'honey', 'maple syrup', 'tahini', 'marinade'
  ],
  'Frozen': [
    'frozen', 'ice cream', 'frozen peas', 'frozen corn', 'frozen berries',
    'waffles', 'frozen pizza', 'puff pastry', 'phyllo', 'frozen spinach',
    'ice', 'fries', 'tater tots', 'edamame'
  ],
  'Beverages': [
    'juice', 'orange juice', 'apple juice', 'coffee', 'espresso', 'tea',
    'soda', 'sparkling water', 'seltzer', 'club soda', 'wine', 'white wine',
    'red wine', 'beer', 'cider', 'lemonade', 'tonic'
  ],
  'Snacks & Sweets': [
    'chip', 'chips', 'pretzel', 'cracker', 'popcorn', 'nut', 'almond',
    'walnut', 'pecan', 'cashew', 'pistachio', 'peanut', 'cookie', 'candy',
    'granola', 'trail mix'
  ],
  'Household & Personal': [
    'paper towel', 'toilet paper', 'trash bag', 'aluminum foil', 'parchment paper',
    'plastic wrap', 'ziploc', 'soap', 'sponge', 'detergent', 'napkin'
  ],
  'Other': []
};

export function categorizeIngredient(text: string): GroceryCategory {
  const normalized = text.toLowerCase().trim();

  // 1. Direct priority matches
  for (const [category, keywords] of Object.entries(KEYWORD_MAP) as [GroceryCategory, string[]][]) {
    for (const kw of keywords) {
      // Word boundary match or inclusion
      const regex = new RegExp(`\\b${kw}`, 'i');
      if (regex.test(normalized)) {
        return category;
      }
    }
  }

  return 'Other';
}
