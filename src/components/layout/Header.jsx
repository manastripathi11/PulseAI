import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Bell, Search, Menu, Sparkles, User, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';

export function Header({ onToggleMobileNav }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { userProfile, searchQuery, setSearchQuery } = useApp();

  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return { title: 'Dashboard Overview', subtitle: 'Workforce insights & quick AI capabilities' };
      case '/chat':
        return { title: 'AI Assistant', subtitle: 'Ask questions, lookup employees, or analyze data' };
      case '/employees':
        return { title: 'Employee Directory', subtitle: 'Browse, filter, and discover team members' };
      case '/analytics':
        return { title: 'Workforce Analytics', subtitle: 'Real-time organization metrics & metrics breakdown' };
      case '/settings':
        return { title: 'Profile Settings', subtitle: 'Manage personal details & preference configurations' };
      default:
        return { title: 'Workspace', subtitle: 'Employee Assistant Portal' };
    }
  };

  const currentMeta = getPageTitle(location.pathname);

  const profileMenuItems = [
    { label: 'View Profile', icon: User, onClick: () => navigate('/settings') },
    { label: 'Preferences', icon: Settings, onClick: () => navigate('/settings') },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 border-b backdrop-blur-md transition-all duration-300 bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 w-full shrink-0">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        {/* Left Side: Mobile Menu Button & Title / Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileNav}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {currentMeta.title}
            </h1>
            <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Global Search / Theme Toggle / Notifications / User */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Search on Desktop if in employees */}
          {location.pathname === '/employees' && (
            <div className="hidden lg:flex items-center relative w-56">
              <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employees..."
                aria-label="Search employees"
                className="w-full bg-slate-100 dark:bg-slate-800/80 text-xs rounded-xl pl-9 pr-3 py-2 text-slate-900 dark:text-white outline-none border border-transparent focus:border-brand-500 transition-colors"
              />
            </div>
          )}

          {/* Quick AI shortcut button if not on chat page */}
          {location.pathname !== '/chat' && (
            <button
              onClick={() => navigate('/chat')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-sm hover:opacity-95 transition-opacity shrink-0"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notification Icon */}
          <button
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
          </button>

          {/* User Profile Dropdown */}
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0" aria-label="User profile menu">
                <Avatar src={userProfile.avatar} name={userProfile.name} size="sm" />
              </button>
            }
            items={profileMenuItems}
          />
        </div>
      </div>
    </header>
  );
}
