/**
 * Helper utility functions for employee metrics & analytics calculations
 */

export const getTotalEmployees = (employees = []) => {
  return employees.length;
};

export const getActiveEmployees = (employees = []) => {
  return employees.filter(e => e.status === 'Active' || e.status === 'Remote').length;
};

export const getRemoteEmployees = (employees = []) => {
  return employees.filter(e => e.status === 'Remote' || e.location.includes('Remote')).length;
};

export const getOnLeaveEmployees = (employees = []) => {
  return employees.filter(e => e.status === 'On Leave').length;
};

export const getDepartmentDistribution = (employees = []) => {
  const counts = {};
  employees.forEach(emp => {
    counts[emp.department] = (counts[emp.department] || 0) + 1;
  });

  return Object.keys(counts).map(dept => ({
    name: dept,
    count: counts[dept],
    percentage: Math.round((counts[dept] / employees.length) * 100)
  }));
};

export const getStatusDistribution = (employees = []) => {
  const statusCounts = {};
  employees.forEach(emp => {
    statusCounts[emp.status] = (statusCounts[emp.status] || 0) + 1;
  });

  return Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));
};

export const getHiringTrends = (employees = []) => {
  const yearCounts = {};
  employees.forEach(emp => {
    const year = emp.joiningDate ? emp.joiningDate.split('-')[0] : '2023';
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  return Object.keys(yearCounts).sort().map(year => ({
    year,
    hired: yearCounts[year]
  }));
};

export const filterEmployees = (employees = [], searchQuery = '', department = 'All') => {
  const query = searchQuery.trim().toLowerCase();
  
  return employees.filter(emp => {
    const matchesDept = department === 'All' || emp.department.toLowerCase() === department.toLowerCase();
    
    if (!query) return matchesDept;

    const matchesSearch =
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.position.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.location.toLowerCase().includes(query);

    return matchesDept && matchesSearch;
  });
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const generateId = () => {
  return 'id-' + Math.random().toString(36).substring(2, 9);
};
