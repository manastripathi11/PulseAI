import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-950/80 text-brand-400 border border-brand-800/60 flex items-center justify-center mx-auto shadow-lg">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Error 404</span>
          <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or view you are looking for does not exist in the PulseAI workspace directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="primary" icon={Home} onClick={() => navigate('/dashboard')} className="w-full">
            Back to Dashboard
          </Button>
          <Button variant="outline" icon={Sparkles} onClick={() => navigate('/chat')} className="w-full text-white border-slate-700 hover:bg-slate-800">
            Open AI Chat
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
