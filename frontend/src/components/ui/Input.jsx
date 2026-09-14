import React from 'react';

export function Input({
  label,
  error,
  icon: Icon = null,
  clearable = false,
  onClear = null,
  value,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          value={value}
          className={`w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm rounded-xl border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-brand-500/20'
          } ${Icon ? 'pl-10' : 'pl-3.5'} ${
            clearable && value ? 'pr-10' : 'pr-3.5'
          } py-2.5 outline-none transition-colors duration-150 focus:ring-2 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${className}`}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
