import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { Footer } from '../components/landing/Footer';
import { Hero } from '../components/landing/Hero'; // We'll just use a simple header, or maybe build one.

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      addToast('success', 'Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Simple Header */}
      <div className="pt-24 pb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-brand-500 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-slate-400">support@pulseai.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-brand-500 mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-slate-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-brand-500 mt-1" />
                <div>
                  <h3 className="font-medium">Office</h3>
                  <p className="text-slate-400">123 AI Boulevard<br/>Tech City, TC 90210</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-500" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Message *</label>
              <textarea 
                name="message" 
                required 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-500" 
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-lg px-4 py-3 font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
