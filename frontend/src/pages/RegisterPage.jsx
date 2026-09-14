import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      addToast('success', 'Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-500 hover:text-brand-400">
            Sign in
          </Link>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-slate-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-800">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
