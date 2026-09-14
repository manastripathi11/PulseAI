import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ChatPage } from './pages/ChatPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AppProvider>
            <BrowserRouter>
              <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Main Dashboard Application Shell */}
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/employees" element={<EmployeesPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </AppProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
