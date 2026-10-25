import React from 'react';
import { Lightbulb, CheckCircle2, Star, Sparkles, X, Smartphone, Zap, MapPin } from 'lucide-react';

interface SuggestedFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestedFeaturesModal: React.FC<SuggestedFeaturesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const currentFeatures = [
    {
      title: 'Smart Recipe Paste & Parser',
      desc: 'Paste multi-line ingredients from any food blog or notes; automatically strips bullets, separates amounts, units, items, and prep notes.',
      icon: <Sparkles size={16} className="text-emerald-500" />
    },
    {
      title: 'Auto-Sort by Supermarket Aisle',
      desc: 'Automatically groups items into Produce, Meat, Dairy, Bakery, Pantry, Frozen, etc., so you never backtrack across the store.',
      icon: <MapPin size={16} className="text-indigo-500" />
    },
    {
      title: 'iPhone Screen Wake Lock',
      desc: 'Keeps your iPhone screen on while shopping with a cart so it doesn\'t lock or dim every 30 seconds.',
      icon: <Zap size={16} className="text-amber-500" />
    },
    {
      title: 'Haptic Feedback & Sound',
      desc: 'Tactile vibration pulse when checking items off on iPhone for instant physical feedback.',
      icon: <Smartphone size={16} className="text-blue-500" />
    },
    {
      title: 'Offline PWA Support',
      desc: 'Works inside steel/concrete supermarkets where cellular signals drop. Saves directly to device storage.',
      icon: <CheckCircle2 size={16} className="text-teal-500" />
    },
    {
      title: 'One-Tap Share & Export',
      desc: 'Send clean, aisle-organized lists straight to iMessage, WhatsApp, or Notes.',
      icon: <CheckCircle2 size={16} className="text-violet-500" />
    }
  ];

  const suggestedRoadmap = [
    {
      title: '📸 Recipe Screenshot / Photo OCR',
      desc: 'Snap a photo of a cookbook or handwritten family recipe card with your iPhone camera to instantly turn it into a checklist.',
      tag: 'Popular',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
    },
    {
      title: '🛒 Custom Aisle Reordering for Your Local Store',
      desc: 'Drag and drop supermarket aisles to match your exact local grocery store (e.g. your local Trader Joe’s, Kroger, or Costco layout).',
      tag: 'Super Useful',
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
    },
    {
      title: '👥 Real-Time Partner / Family Sync',
      desc: 'Share a live shopping trip link with your spouse or partner. As one person checks off items in Dairy, they disappear on both phones simultaneously.',
      tag: 'Game Changer',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
    },
    {
      title: '⚖️ Unit Scaling & Serving Multiplier',
      desc: 'Double or halve recipe batches (e.g., cooking for 8 people instead of 4) before creating the shopping list.',
      tag: 'Cooking Pro',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
    },
    {
      title: '⌚ Apple Watch Companion View',
      desc: 'Glance and tap checkboxes directly on your wrist while your hands are full pushing a grocery cart.',
      tag: 'iPhone Companion',
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
    },
    {
      title: '💲 Estimated Grocery Cart Total & Budgeting',
      desc: 'Track price estimates and budget before reaching the checkout register.',
      tag: 'Budgeting',
      color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300'
    },
    {
      title: '📦 Pantry Check ("Already Have It")',
      desc: 'Tap ingredients you already have in your pantry or fridge (like olive oil or salt) to exclude them from the shopping cart.',
      tag: 'Saves Money',
      color: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[88vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              <Lightbulb size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Features & Suggestions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Designed specifically for iPhone grocery shopping
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

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5">
          
          {/* Active Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Star size={14} className="text-emerald-500 fill-emerald-500" />
              Built-In Features Ready to Use
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-800 dark:text-slate-200">
                    {feat.icon}
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Feature Suggestions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              Suggested Roadmap Features
            </h3>
            <div className="space-y-2.5">
              {suggestedRoadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.color}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
          >
            Got It!
          </button>
        </div>

      </div>
    </div>
  );
};
