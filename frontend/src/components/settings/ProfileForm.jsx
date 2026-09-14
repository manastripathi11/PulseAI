import React, { useState } from 'react';
import { Save, User, Mail, Briefcase, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export function ProfileForm() {
  const { userProfile, updateProfile } = useApp();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    role: userProfile.role || '',
    location: userProfile.location || '',
    bio: userProfile.bio || ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    addToast('Profile information saved successfully', 'success');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={User}>Personal Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={User}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />

            <Input
              label="Job Role / Position"
              icon={Briefcase}
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              required
            />

            <Input
              label="Location"
              icon={MapPin}
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Biography / Professional Summary
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="Tell your team about yourself..."
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
