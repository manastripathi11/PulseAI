import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { Trash2, Users, MessageSquare, Briefcase } from 'lucide-react';

export function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState('contacts');
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [contactsRes, usersRes, quotesRes] = await Promise.all([
        api.get('/admin/contacts'),
        api.get('/admin/users'),
        api.get('/admin/quotes')
      ]);
      setContacts(contactsRes.data);
      setUsers(usersRes.data);
      setQuotes(quotesRes.data);
    } catch (err) {
      addToast('error', 'Failed to fetch admin data');
    }
  };

  const deleteContact = async (id) => {
    try {
      await api.delete(`/admin/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      addToast('success', 'Contact deleted');
    } catch (err) {
      addToast('error', 'Failed to delete contact');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${activeTab === 'contacts' ? 'bg-brand-600' : 'bg-slate-800'}`}
            onClick={() => setActiveTab('contacts')}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Contacts</span>
          </button>
          <button 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-brand-600' : 'bg-slate-800'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
          <button 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${activeTab === 'quotes' ? 'bg-brand-600' : 'bg-slate-800'}`}
            onClick={() => setActiveTab('quotes')}
          >
            <Briefcase className="w-5 h-5" />
            <span>Quotes</span>
          </button>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {activeTab === 'contacts' && (
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id} className="border-t border-slate-800">
                    <td className="p-4">{c.name}</td>
                    <td className="p-4">{c.email}</td>
                    <td className="p-4">{c.subject}</td>
                    <td className="p-4 truncate max-w-xs">{c.message}</td>
                    <td className="p-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button onClick={() => deleteContact(c._id)} className="text-red-500 hover:text-red-400">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'users' && (
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-t border-slate-800">
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 capitalize">{u.role}</td>
                    <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'quotes' && (
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(q => (
                  <tr key={q._id} className="border-t border-slate-800">
                    <td className="p-4">{q.name}</td>
                    <td className="p-4">{q.email}</td>
                    <td className="p-4">{q.serviceRequired}</td>
                    <td className="p-4">{q.budget}</td>
                    <td className="p-4 truncate max-w-xs">{q.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
