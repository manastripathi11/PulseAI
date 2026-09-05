import React from 'react';
import { Bell, Mail, Bot, Users, BarChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export function NotificationSettings() {
  const { notificationSettings, updateNotifications } = useApp();
  const { addToast } = useToast();

  const handleToggle = (key) => {
    const updated = { ...notificationSettings, [key]: !notificationSettings[key] };
    updateNotifications(updated);
    addToast('Notification preferences updated', 'info', 2000);
  };

  const preferences = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      desc: 'Receive important account alerts and directory update digests via email.',
      icon: Mail
    },
    {
      key: 'aiAssistantUpdates',
      title: 'AI Assistant Digest',
      desc: 'Get periodic summaries of popular AI workspace prompts and queries.',
      icon: Bot
    },
    {
      key: 'teamUpdates',
      title: 'Team & Directory Updates',
      desc: 'Notifications when new employees join or department transfers occur.',
      icon: Users
    },
    {
      key: 'weeklySummary',
      title: 'Weekly Analytics Report',
      desc: 'Receive automated weekly workforce statistics and department metrics.',
      icon: BarChart
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Bell}>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {preferences.map((pref) => {
            const Icon = pref.icon;
            const isEnabled = !!notificationSettings[pref.key];

            return (
              <div
                key={pref.key}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0 pr-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {pref.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {pref.desc}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => handleToggle(pref.key)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEnabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
