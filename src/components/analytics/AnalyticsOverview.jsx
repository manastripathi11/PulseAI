import React from 'react';
import { Users, UserCheck, Globe, Building2 } from 'lucide-react';
import { StatCard } from './StatCard';
import { DepartmentChart } from './DepartmentChart';
import { ActivityChart } from './ActivityChart';
import {
  getTotalEmployees,
  getActiveEmployees,
  getRemoteEmployees,
  getDepartmentDistribution,
  getStatusDistribution,
  getHiringTrends
} from '../../utils/helpers';

export function AnalyticsOverview({ employees }) {
  const total = getTotalEmployees(employees);
  const active = getActiveEmployees(employees);
  const remote = getRemoteEmployees(employees);
  const deptDist = getDepartmentDistribution(employees);
  const statusDist = getStatusDistribution(employees);
  const hiringTrends = getHiringTrends(employees);

  return (
    <div className="space-y-8">
      {/* 4 Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Workforce"
          value={total}
          subtext="Total personnel records"
          trend="+12% YoY"
          icon={Users}
          color="brand"
        />
        <StatCard
          title="Active Personnel"
          value={active}
          subtext={`${Math.round((active / total) * 100)}% active rate`}
          trend="Operational"
          icon={UserCheck}
          color="emerald"
        />
        <StatCard
          title="Remote Members"
          value={remote}
          subtext="Distributed worldwide"
          trend="Global"
          icon={Globe}
          color="indigo"
        />
        <StatCard
          title="Departments"
          value={deptDist.length}
          subtext="Cross-functional units"
          trend="7 Active"
          icon={Building2}
          color="purple"
        />
      </div>

      {/* Recharts Bar & Pie Charts */}
      <DepartmentChart departmentData={deptDist} statusData={statusDist} />

      {/* Hiring Growth Trends */}
      <ActivityChart hiringData={hiringTrends} />
    </div>
  );
}
