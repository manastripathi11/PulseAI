import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, BarChart3, UserCheck, Zap, Shield, Sparkles } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: Bot,
      color: 'from-brand-500 to-indigo-600',
      title: 'AI Employee Assistant',
      description: 'Interact with Google Gemini LLM trained directly on organizational data. Ask employee questions, role distributions, or productivity recommendations.'
    },
    {
      icon: Users,
      color: 'from-indigo-500 to-purple-600',
      title: 'Smart Employee Directory',
      description: 'Search, filter, and inspect detailed profile cards across departments, locations, emails, and active employment status in real time.'
    },
    {
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      title: 'Workforce Analytics',
      description: 'Interactive Recharts visualization showcasing department proportions, remote vs office personnel ratios, and historical hiring velocity.'
    },
    {
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
      title: 'Personalized Workspace',
      description: 'Tailor your experience with seamless dark mode toggles, local chat history persistence, voice input controls, and custom notifications.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-400">
            Engineered For Modern Workflows
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything your team needs to stay connected and informed
          </p>
          <p className="text-sm text-slate-400">
            A cohesive suite of internal workforce tools designed for high-performing engineering and product teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 shadow-lg group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center gap-1 text-xs font-semibold text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
