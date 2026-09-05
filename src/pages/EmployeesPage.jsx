import React from 'react';
import { useApp } from '../context/AppContext';
import { EmployeeSearch } from '../components/employees/EmployeeSearch';
import { EmployeeFilters } from '../components/employees/EmployeeFilters';
import { EmployeeGrid } from '../components/employees/EmployeeGrid';
import { EmployeeModal } from '../components/employees/EmployeeModal';
import { filterEmployees } from '../utils/helpers';
import { Users, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function EmployeesPage() {
  const {
    employees,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    resetFilters,
    selectedEmployeeModal,
    setSelectedEmployeeModal
  } = useApp();

  const filteredEmployees = filterEmployees(employees, searchQuery, selectedDepartment);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedDepartment !== 'All';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-200/50 dark:border-brand-800/40">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Employee Directory</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {filteredEmployees.length} of {employees.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter by name, department, role, or work location
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <EmployeeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              icon={RotateCcw}
              title="Reset search and filters"
              className="shrink-0 text-slate-500"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Department Filter Pills */}
      <EmployeeFilters
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        employees={employees}
      />

      {/* Grid of Employees */}
      <EmployeeGrid
        employees={filteredEmployees}
        onSelectEmployee={(emp) => setSelectedEmployeeModal(emp)}
        onResetFilters={resetFilters}
      />

      {/* Detail Modal */}
      <EmployeeModal
        employee={selectedEmployeeModal}
        isOpen={!!selectedEmployeeModal}
        onClose={() => setSelectedEmployeeModal(null)}
      />
    </div>
  );
}
