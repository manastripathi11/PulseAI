import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    addToast(`Theme set to ${newTheme} mode`, 'info', 2000);
  };

  const themeOptions = [
    { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Clean high-contrast theme for daytime productivity' },
    { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Sleek dark interface tailored for low-light focus' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Sun}>Appearance & Theme Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectTheme(opt.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-brand-500" />
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {opt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
