import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export function StatCard({ title, value, subtext, icon: Icon, trend = null, color = 'brand' }) {
  const colorMap = {
    brand: 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border-brand-200/50 dark:border-brand-800/40',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/40',
    indigo: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/40',
    purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/40',
  };

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="p-5 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {value}
            </div>
          </div>
          <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${colorMap[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {subtext && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">{subtext}</span>
            {trend && (
              <span className={`font-semibold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                {trend}
              </span>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
