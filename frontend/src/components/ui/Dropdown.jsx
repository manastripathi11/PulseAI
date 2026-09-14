import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Dropdown({ trigger, items, align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50`}
          >
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2.5 transition-colors ${
                  item.danger
                    ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 shrink-0" />}
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
