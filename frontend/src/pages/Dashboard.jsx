import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Users, Bot, BarChart3, ArrowRight, UserCheck, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/analytics/StatCard';
import { DepartmentChart } from '../components/analytics/DepartmentChart';
import { EmployeeCard } from '../components/employees/EmployeeCard';
import { EmployeeModal } from '../components/employees/EmployeeModal';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { SUGGESTED_PROMPTS } from '../utils/constants';
import {
  getTotalEmployees,
  getActiveEmployees,
  getRemoteEmployees,
  getDepartmentDistribution,
  getStatusDistribution
} from '../utils/helpers';

export function Dashboard() {
  const navigate = useNavigate();
  const { employees, userProfile, selectedEmployeeModal, setSelectedEmployeeModal } = useApp();

  const total = getTotalEmployees(employees);
  const active = getActiveEmployees(employees);
  const remote = getRemoteEmployees(employees);
  const deptDist = getDepartmentDistribution(employees);
  const statusDist = getStatusDistribution(employees);

  const featuredEmployees = employees.slice(0, 4);

  return (
    <div className="space-y-8 pb-12 w-full min-w-0">
      {/* Welcome AI Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="space-y-2 max-w-xl relative z-10 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-700/50 text-[11px] font-bold text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copilot Ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {userProfile.name.split(' ')[0]}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your AI assistant is connected with <strong>{total} team profiles</strong> across <strong>{deptDist.length} departments</strong>. Ask anything or explore team insights.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <Button variant="primary" size="lg" onClick={() => navigate('/chat')} className="shadow-lg shadow-brand-600/30 whitespace-nowrap">
            <Bot className="w-5 h-5 shrink-0" />
            <span>Launch AI Assistant</span>
          </Button>
        </div>
      </motion.div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Workforce"
          value={total}
          subtext="Verified employee records"
          trend="+12%"
          icon={Users}
          color="brand"
        />
        <StatCard
          title="Active Personnel"
          value={active}
          subtext="On-site and active"
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
          subtext="Functional units"
          trend="7 Units"
          icon={BarChart3}
          color="purple"
        />
      </div>

      {/* Quick AI Prompt Launcher & Recent Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick AI Launcher Card */}
        <Card className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle icon={Sparkles}>Quick AI Copilot Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any prompt to instantly query your internal Gemini workspace copilot:
              </p>
              <div className="space-y-2">
                {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate('/chat')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200/60 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-500 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </CardContent>
          </div>

          <div className="p-5 pt-0">
            <Button variant="outline" size="sm" onClick={() => navigate('/chat')} className="w-full">
              <span>Open Custom Chat</span>
              <Bot className="w-4 h-4 text-brand-500 shrink-0" />
            </Button>
          </div>
        </Card>

        {/* Featured Employee Team Preview */}
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Featured Teammates</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Key department leaders and team members
              </p>
            </div>

            <Button variant="ghost" size="sm" onClick={() => navigate('/employees')} className="gap-1 text-xs shrink-0 whitespace-nowrap">
              <span>View All ({total})</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredEmployees.map(emp => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onClick={() => setSelectedEmployeeModal(emp)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Overview Snapshot */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Department Breakdown & Proportions</span>
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')} className="gap-1 text-xs shrink-0 whitespace-nowrap">
            <span>Detailed Analytics</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Button>
        </div>

        <DepartmentChart departmentData={deptDist} statusData={statusDist} />
      </div>

      {/* Employee Detail Modal */}
      <EmployeeModal
        employee={selectedEmployeeModal}
        isOpen={!!selectedEmployeeModal}
        onClose={() => setSelectedEmployeeModal(null)}
      />
    </div>
  );
}
