import React, { useState } from 'react';
import { User, Sun, Bell } from 'lucide-react';
import { ProfileForm } from '../components/settings/ProfileForm';
import { ThemeSettings } from '../components/settings/ThemeSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'theme', label: 'Theme & Appearance', icon: Sun },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Tab Navigation Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="max-w-3xl">
        {activeTab === 'profile' && <ProfileForm />}
        {activeTab === 'theme' && <ThemeSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>
    </div>
  );
}
