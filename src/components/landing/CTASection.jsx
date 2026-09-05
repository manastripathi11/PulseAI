import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-850 p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Accent Radial */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="space-y-6 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-800/60 text-xs font-semibold text-brand-300">
              <Shield className="w-3.5 h-3.5 text-brand-400" />
              Secure Enterprise Portal
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to streamline your internal employee intelligence?
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Experience the power of a conversational AI copilot integrated with workforce directory metrics and analytics.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/dashboard')}
                className="px-8 shadow-lg shadow-brand-600/30"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/chat')}
                className="px-8 text-white border-slate-700 hover:bg-slate-800"
              >
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>Try AI Chat</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
