export const DEPARTMENTS = [
  'All',
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'HR',
  'Finance'
];

export const EMPLOYEE_STATUSES = {
  ACTIVE: 'Active',
  ON_LEAVE: 'On Leave',
  REMOTE: 'Remote',
  OFFLINE: 'Offline'
};

export const SUGGESTED_PROMPTS = [
  "Who works in the Engineering department?",
  "Summarize our employee distribution across departments.",
  "Which departments have the most employees?",
  "Give me an overview of our organization structure.",
  "Who are our design lead and senior engineers?",
  "How can I improve team collaboration and cross-functional sync?"
];

export const DEFAULT_USER_PROFILE = {
  name: 'Alex Vance',
  email: 'alex.vance@company.com',
  role: 'Senior Product Manager',
  department: 'Product',
  location: 'San Francisco, CA',
  bio: 'Passionate about build product-driven cultures, AI-native tools, and high-velocity engineering teams.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
};

export const DEFAULT_NOTIFICATIONS = {
  emailNotifications: true,
  aiAssistantUpdates: true,
  teamUpdates: true,
  weeklySummary: false,
};
