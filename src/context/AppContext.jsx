import React, { createContext, useContext, useState } from 'react';
import { MOCK_EMPLOYEES } from '../data/employees';
import { DEFAULT_USER_PROFILE, DEFAULT_NOTIFICATIONS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedEmployeeModal, setSelectedEmployeeModal] = useState(null);

  // Persistent User Profile and Settings
  const [userProfile, setUserProfile] = useLocalStorage('pulse_user_profile', DEFAULT_USER_PROFILE);
  const [notificationSettings, setNotificationSettings] = useLocalStorage('pulse_notification_settings', DEFAULT_NOTIFICATIONS);

  const updateProfile = (updatedData) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  const updateNotifications = (updatedSettings) => {
    setNotificationSettings(prev => ({ ...prev, ...updatedSettings }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,
        searchQuery,
        setSearchQuery,
        selectedDepartment,
        setSelectedDepartment,
        resetFilters,
        selectedEmployeeModal,
        setSelectedEmployeeModal,
        userProfile,
        updateProfile,
        notificationSettings,
        updateNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
