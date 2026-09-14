import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { FeatureSection } from '../components/landing/FeatureSection';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';
import { QuoteModal } from '../components/landing/QuoteModal';

export function LandingPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-brand-500 selection:text-white relative">
      {/* Landing Page Header */}
      <header className="absolute top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-sm border-b border-slate-900">
        <div className="flex items-center space-x-2 font-bold text-xl">
          <span className="text-brand-500">Pulse</span>AI
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/contact" className="hover:text-brand-400">Contact</Link>
          <button onClick={() => setIsQuoteOpen(true)} className="hover:text-brand-400">Get a Free Quote</button>
          
          {user ? (
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-800">
              <span className="text-slate-300">Hi, {user.name}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-brand-400 hover:text-brand-300">Admin</Link>
              )}
              <Link to="/dashboard" className="hover:text-brand-400">App</Link>
              <button onClick={handleLogout} className="text-slate-400 hover:text-white">Logout</button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-800">
              <Link to="/login" className="hover:text-brand-400">Login</Link>
              <Link to="/register" className="bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-md transition-colors">Register</Link>
            </div>
          )}
        </div>
      </header>

      <div className="pt-16">
        <Hero />
        <FeatureSection />
        <CTASection />
        <Footer />
      </div>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
