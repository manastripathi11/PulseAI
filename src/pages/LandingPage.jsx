import React from 'react';
import { Hero } from '../components/landing/Hero';
import { FeatureSection } from '../components/landing/FeatureSection';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Hero />
      <FeatureSection />
      <CTASection />
      <Footer />
    </div>
  );
}
