import type { GroceryCategory, GroceryItem } from '../types';
import { categorizeIngredient } from './categorizer';

// Common units of measure
const UNITS = [
  'cup', 'cups', 'c',
  'tablespoon', 'tablespoons', 'tbsp', 'tbs', 'tb', 't',
  'teaspoon', 'teaspoons', 'tsp',
  'ounce', 'ounces', 'oz',
  'pound', 'pounds', 'lb', 'lbs',
  'gram', 'grams', 'g',
  'kilogram', 'kilograms', 'kg',
  'milliliter', 'milliliters', 'ml',
  'liter', 'liters', 'l',
  'pinch', 'pinches',
  'dash', 'dashes',
  'clove', 'cloves',
  'can', 'cans',
  'package', 'packages', 'pkg', 'pkgs',
  'slice', 'slices',
  'piece', 'pieces',
  'bunch', 'bunches',
  'stalk', 'stalks',
  'sprig', 'sprigs',
  'head', 'heads',
  'pint', 'pints', 'pt',
  'quart', 'quarts', 'qt',
  'gallon', 'gallons', 'gal',
  'bottle', 'bottles',
  'bag', 'bags',
  'box', 'boxes',
  'container', 'containers',
  'jar', 'jars'
];

// Convert unicode fractions to standard decimals/fractions
const UNICODE_FRACTIONS: Record<string, string> = {
  '½': '1/2',
  '⅓': '1/3',
  '⅔': '2/3',
  '¼': '1/4',
  '¾': '3/4',
  '⅕': '1/5',
  '⅖': '2/5',
  '⅗': '3/5',
  '⅘': '4/5',
  '⅙': '1/6',
  '⅚': '5/6',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
};

export function parseRawIngredientLine(raw: string, recipeId?: string, recipeName?: string): GroceryItem | null {
  let line = raw.trim();
  if (!line) return null;

  // Replace unicode fractions
  for (const [unicode, ascii] of Object.entries(UNICODE_FRACTIONS)) {
    line = line.replace(new RegExp(unicode, 'g'), ` ${ascii} `);
  }

  // Remove bullets, list numbers, checkboxes
  // Matches: "1. ", "• ", "- ", "* ", "[ ] ", "[x] ", etc.
  line = line.replace(/^(\d+[\.\)]\s*|[\*\-•–—]\s*|\[[\sxX]?\]\s*)/, '').trim();

  // If the line is just a section header (e.g. "For the sauce:", "Ingredients:")
  if (/^([a-z\s]+:)$/i.test(line) || /^ingredients:?$/i.test(line) || /^instructions:?$/i.test(line)) {
    return null;
  }

  if (!line) return null;

  const originalCleaned = line;

  // Extract quantity at start:
  // e.g. "2", "2 1/2", "1/2", "1.5", "1-2", "2 to 3"
  const qtyRegex = /^((?:\d+\s+)?\d+\/\d+|\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?(?:\s+to\s+\d+)?)/i;
  const qtyMatch = line.match(qtyRegex);

  let quantity: string | undefined = undefined;
  let unit: string | undefined = undefined;
  let remaining = line;

  if (qtyMatch) {
    quantity = qtyMatch[1].trim();
    remaining = line.slice(qtyMatch[0].length).trim();
  }

  // Extract unit
  const words = remaining.split(/\s+/);
  if (words.length > 0) {
    const firstWordClean = words[0].toLowerCase().replace(/[^a-z]/g, '');
    if (UNITS.includes(firstWordClean)) {
      unit = words[0].replace(/[\.,]/g, '');
      remaining = words.slice(1).join(' ').trim();
    }
  }

  // Extract notes / prep instructions (e.g. ", minced", ", chopped", "(drained)")
  let notes: string | undefined = undefined;
  const commaIndex = remaining.indexOf(',');
  if (commaIndex !== -1) {
    notes = remaining.slice(commaIndex + 1).trim();
    remaining = remaining.slice(0, commaIndex).trim();
  }

  // Check for parenthesis notes e.g. "tomatoes (diced)"
  const parenMatch = remaining.match(/\((.*?)\)/);
  if (parenMatch) {
    const parenNote = parenMatch[1];
    notes = notes ? `${parenNote}, ${notes}` : parenNote;
    remaining = remaining.replace(/\((.*?)\)/, '').trim();
  }

  // Clean up item name
  let name = remaining.trim();
  if (!name && originalCleaned) {
    name = originalCleaned;
  }

  // Capitalize first letter of item name
  if (name.length > 0) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  const category: GroceryCategory = categorizeIngredient(`${name} ${originalCleaned}`);

  return {
    id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    recipeId,
    recipeName,
    rawText: originalCleaned,
    name: name || originalCleaned,
    quantity,
    unit,
    notes,
    category,
    checked: false,
    createdAt: Date.now(),
  };
}

export function parseIngredientsBlock(text: string, recipeId?: string, recipeName?: string): GroceryItem[] {
  const lines = text.split(/\r?\n/);
  const items: GroceryItem[] = [];

  for (const line of lines) {
    const parsed = parseRawIngredientLine(line, recipeId, recipeName);
    if (parsed) {
      items.push(parsed);
    }
  }

  return items;
}
