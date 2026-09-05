import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Calendar, ArrowUpRight } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function EmployeeCard({ employee, onClick }) {
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Remote':
        return 'info';
      case 'On Leave':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        onClick={onClick}
        className="p-5 flex flex-col justify-between h-full group relative overflow-hidden"
      >
        {/* Subtle accent top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="space-y-4">
          {/* Header with Avatar and Status */}
          <div className="flex items-start justify-between gap-3">
            <Avatar src={employee.avatar} name={employee.name} size="lg" status={employee.status} />
            <Badge variant={getStatusBadgeVariant(employee.status)}>
              {employee.status}
            </Badge>
          </div>

          {/* Name & Title */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1.5">
              <span>{employee.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand-500 shrink-0" />
            </h3>
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
              {employee.position}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {employee.department}
            </p>
          </div>
        </div>

        {/* Footer Meta Details */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{employee.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{employee.location}</span>
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
