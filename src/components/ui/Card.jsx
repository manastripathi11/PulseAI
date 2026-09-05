import React from 'react';

export function Card({ children, className = '', hover = true, onClick = null, ...props }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm ${
        hover ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-5 pb-3 border-b border-slate-100 dark:border-slate-800/60 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', icon: Icon = null }) {
  return (
    <h3 className={`text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2 ${className}`}>
      {Icon && <Icon className="w-4 h-4 text-brand-500" />}
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}
