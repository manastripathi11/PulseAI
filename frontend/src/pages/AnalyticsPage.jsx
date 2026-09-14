import React from 'react';
import { useApp } from '../context/AppContext';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';
import { BarChart3 } from 'lucide-react';

export function AnalyticsPage() {
  const { employees } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200/50 dark:border-purple-800/40">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Workforce Intelligence & Analytics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live department distributions, remote workforce ratios, and hiring trends derived from employee records
            </p>
          </div>
        </div>
      </div>

      <AnalyticsOverview employees={employees} />
    </div>
  );
}
