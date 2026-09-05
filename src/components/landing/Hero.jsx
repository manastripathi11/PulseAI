import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Users, Bot, BarChart3, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-slate-950 text-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-600/20 via-purple-600/20 to-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Enterprise AI Workspace Assistant</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Your AI-powered <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              workplace assistant.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Empower your organization to discover team talent, uncover real-time department insights, and answer complex enterprise queries instantly with an intelligent workspace copilot.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/chat')}
              className="px-8 shadow-lg shadow-brand-600/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>Open AI Assistant</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/employees')}
              className="px-8 text-white border-slate-700 hover:bg-slate-900"
            >
              <span>Explore Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Key highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Powered by Gemini API
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Analytics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Configuration
            </span>
          </motion.div>
        </div>

        {/* Hero Interactive UI Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* Mock Window Controls */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              pulse-ai-workspace.internal
            </div>
            <div className="text-xs text-slate-500 font-medium">Enterprise v2.4</div>
          </div>

          {/* Inner UI Preview */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/40">
            {/* AI Assistant Chat Preview */}
            <div className="md:col-span-2 rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">PulseAI Copilot</h4>
                  <span className="text-[10px] text-emerald-400">● Active directory context</span>
                </div>
              </div>

              {/* Sample Messages */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-800/60 rounded-lg p-3 text-slate-300 max-w-[85%] border border-slate-700/50">
                  <p className="font-medium text-slate-200">"Which department has our highest headcount and what are our top engineering skills?"</p>
                </div>
                <div className="bg-brand-950/50 rounded-lg p-3 text-brand-200 ml-auto max-w-[90%] border border-brand-800/40 space-y-1">
                  <p className="font-semibold text-brand-300">✦ Engineering represents 39% of total personnel (7 members).</p>
                  <p className="text-slate-300">Key leads: Sophia Chen (VP), Marcus Vance (Principal AI Architect), and Aisha Patel (Senior Frontend Lead).</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics & Directory Snapshot */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Workforce Health</span>
                  <BarChart3 className="w-4 h-4 text-brand-400" />
                </div>
                <div className="text-2xl font-bold text-white">18 Active</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full w-[85%]" />
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">Featured Teammates</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40">
                    <span className="font-medium text-slate-200">Sophia Chen</span>
                    <span className="text-[10px] text-brand-400">VP Eng</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40">
                    <span className="font-medium text-slate-200">Elena Rostova</span>
                    <span className="text-[10px] text-purple-400">Lead Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
