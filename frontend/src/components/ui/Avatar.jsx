import React from 'react';

export function Avatar({ src, name, size = 'md', status = null, className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  };

  const statusColors = {
    Active: 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900',
    Remote: 'bg-sky-500 ring-2 ring-white dark:ring-slate-900',
    'On Leave': 'bg-amber-500 ring-2 ring-white dark:ring-slate-900',
    Offline: 'bg-slate-400 ring-2 ring-white dark:ring-slate-900'
  };

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.split(' ');
    return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
  };

  return (
    <div className="relative inline-block shrink-0">
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-slate-200/60 dark:ring-slate-800 ${className}`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-semibold flex items-center justify-center ring-2 ring-slate-200/60 dark:ring-slate-800 ${className}`}
        >
          {getInitials(name)}
        </div>
      )}
      {status && statusColors[status] && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColors[status]}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}
