import React, { useState } from 'react';
import type { GroceryItem } from '../types';
import { formatListForSharing } from '../utils/storage';
import { Share2, Copy, Check, X, MessageSquare } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GroceryItem[];
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, items }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const textContent = formatListForSharing(items);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Grocery Shopping List',
          text: textContent,
        });
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              <Share2 size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Share Shopping List
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Send to iMessage, WhatsApp, or Notes
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

        {/* Text Preview */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          <div className="relative">
            <pre className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs font-mono text-slate-700 dark:text-slate-300 max-h-64 overflow-y-auto whitespace-pre-wrap border border-slate-200 dark:border-slate-700">
              {textContent}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2.5">
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm active:scale-95 transition"
            >
              <MessageSquare size={16} /> Share via iPhone...
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold active:scale-95 transition ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>
        </div>

      </div>
    </div>
  );
};
