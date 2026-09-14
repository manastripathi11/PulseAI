import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ActivityChart({ hiringData }) {
  const { isDark } = useTheme();

  const customTooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#1e293b' : '#e2e8f0',
    color: isDark ? '#f8fafc' : '#0f172a',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    fontSize: '12px',
    fontWeight: '600'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={TrendingUp}>Annual Growth & Hiring Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hiringData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="year"
                tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={customTooltipStyle} />
              <Area
                type="monotone"
                dataKey="hired"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorHired)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
