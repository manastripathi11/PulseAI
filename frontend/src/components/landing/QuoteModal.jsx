import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

export function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'AI Integration',
    budget: '< $5k',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/quote', formData);
      addToast('success', 'Quote request submitted successfully!');
      onClose();
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to submit quote');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden text-left"
        >
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <h2 className="text-xl font-semibold text-white">Get a Free Quote</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-white text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 focus:border-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 focus:border-brand-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Phone *</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 focus:border-brand-500 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Service Required *</label>
                <select required name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 focus:border-brand-500 outline-none">
                  <option value="AI Integration">AI Integration</option>
                  <option value="Custom Development">Custom Development</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Budget *</label>
                <select required name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 focus:border-brand-500 outline-none">
                  <option value="< $5k">&lt; $5k</option>
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k - $50k">$10k - $50k</option>
                  <option value="> $50k">&gt; $50k</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 focus:border-brand-500 outline-none"></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50 mt-4">
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
