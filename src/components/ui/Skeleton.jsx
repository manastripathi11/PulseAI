import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const variantStyles = {
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    text: 'rounded-md h-4 w-full'
  };

  return (
    <div
      className={`bg-slate-200 dark:bg-slate-800 animate-pulse-slow ${variantStyles[variant]} ${className}`}
    />
  );
}

export function EmployeeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12 shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-3/4 h-4" />
          <Skeleton variant="text" className="w-1/2 h-3" />
        </div>
      </div>
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <Skeleton variant="text" className="w-full h-3" />
        <Skeleton variant="text" className="w-2/3 h-3" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-1/3 h-4" />
        <Skeleton variant="circular" className="w-10 h-10" />
      </div>
      <Skeleton variant="text" className="w-1/2 h-8" />
      <Skeleton variant="text" className="w-1/4 h-3" />
    </div>
  );
}
