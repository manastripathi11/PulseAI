import React from 'react';
import { EmployeeCard } from './EmployeeCard';
import { EmptyState } from '../ui/EmptyState';
import { EmployeeCardSkeleton } from '../ui/Skeleton';

export function EmployeeGrid({ employees, onSelectEmployee, isLoading = false, onResetFilters }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, idx) => (
          <EmployeeCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees found"
        description="No team members match your current search query or department filter."
        actionLabel="Clear Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {employees.map(emp => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onClick={() => onSelectEmployee(emp)}
        />
      ))}
    </div>
  );
}
