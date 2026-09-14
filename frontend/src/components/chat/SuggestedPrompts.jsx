import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '../../utils/constants';

export function SuggestedPrompts({ onSelectPrompt }) {
  return (
    <div className="my-6 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        <span>Suggested AI Prompts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SUGGESTED_PROMPTS.map((prompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01, x: 2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectPrompt(prompt)}
            className="text-left p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors group flex items-start gap-2.5"
          >
            <span className="text-brand-500 font-bold group-hover:translate-x-0.5 transition-transform shrink-0 mt-0.5">✦</span>
            <span>{prompt}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
