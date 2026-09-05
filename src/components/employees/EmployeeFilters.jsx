import React from 'react';
import { DEPARTMENTS } from '../../utils/constants';

export function EmployeeFilters({ selectedDepartment, onSelectDepartment, employees = [] }) {
  const getDepartmentCount = (dept) => {
    if (dept === 'All') return employees.length;
    return employees.filter(e => e.department.toLowerCase() === dept.toLowerCase()).length;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {DEPARTMENTS.map(dept => {
        const isSelected = selectedDepartment === dept;
        const count = getDepartmentCount(dept);

        return (
          <button
            key={dept}
            onClick={() => onSelectDepartment(dept)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 border ${
              isSelected
                ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-600/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{dept}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
