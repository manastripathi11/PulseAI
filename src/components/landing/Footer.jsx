import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">PulseAI</span>
              <p className="text-xs text-slate-500">AI-Powered Employee Assistant & Enterprise Workspace</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <NavLink to="/dashboard" className="hover:text-white transition-colors">Dashboard</NavLink>
            <NavLink to="/chat" className="hover:text-white transition-colors">AI Assistant</NavLink>
            <NavLink to="/employees" className="hover:text-white transition-colors">Employees</NavLink>
            <NavLink to="/analytics" className="hover:text-white transition-colors">Analytics</NavLink>
            <NavLink to="/settings" className="hover:text-white transition-colors">Settings</NavLink>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-500">
            <a href="#github" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="#twitter" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#linkedin" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PulseAI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
