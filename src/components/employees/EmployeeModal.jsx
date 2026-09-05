import React from 'react';
import { Mail, MapPin, Calendar, Briefcase, Building, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

export function EmployeeModal({ employee, isOpen, onClose }) {
  const navigate = useNavigate();
  if (!employee) return null;

  const handleAskAIAboutEmployee = () => {
    onClose();
    navigate('/chat');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Employee Profile Details" maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Banner & Main Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <Avatar src={employee.avatar} name={employee.name} size="xl" status={employee.status} />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {employee.name}
              </h2>
              <Badge variant="brand">{employee.status}</Badge>
            </div>
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
              {employee.position}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {employee.department} Department
            </p>
          </div>
        </div>

        {/* Bio Section */}
        {employee.bio && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-900 dark:text-white mb-1">About</p>
            <p>{employee.bio}</p>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Email Address</span>
              <p className="font-medium text-slate-900 dark:text-white truncate">{employee.email}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Work Location</span>
              <p className="font-medium text-slate-900 dark:text-white truncate">{employee.location}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Building className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Department</span>
              <p className="font-medium text-slate-900 dark:text-white truncate">{employee.department}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Joining Date</span>
              <p className="font-medium text-slate-900 dark:text-white truncate">{formatDate(employee.joiningDate)}</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={`mailto:${employee.email}`}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Direct Email</span>
          </a>

          <Button variant="primary" size="sm" onClick={handleAskAIAboutEmployee}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Copilot About {employee.name.split(' ')[0]}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
