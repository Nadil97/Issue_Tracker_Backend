import type { IssueStatus, IssuePriority } from '../types';

export const API_BASE_URL = 'http://localhost:3000/api';

export const STATUS_OPTIONS: IssueStatus[] = ['Open', 'In Progress', 'Resolved'];
export const PRIORITY_OPTIONS: IssuePriority[] = ['Low', 'Medium', 'High'];

export const STATUS_COLORS: Record<IssueStatus, { bg: string; text: string; border: string }> = {
  Open: { bg: '#1a3a2a', text: '#4ade80', border: '#22c55e' },
  'In Progress': { bg: '#1a2a3a', text: '#60a5fa', border: '#3b82f6' },
  Resolved: { bg: '#2a1a3a', text: '#a78bfa', border: '#8b5cf6' },
};

export const PRIORITY_COLORS: Record<IssuePriority, { bg: string; text: string; border: string }> = {
  Low: { bg: '#1e293b', text: '#94a3b8', border: '#475569' },
  Medium: { bg: '#292013', text: '#fbbf24', border: '#f59e0b' },
  High: { bg: '#2a1213', text: '#f87171', border: '#ef4444' },
};

export const SORT_OPTIONS = [
  { label: 'Newest First', value: '-createdAt' },
  { label: 'Oldest First', value: 'createdAt' },
  { label: 'Priority High→Low', value: '-priority' },
  { label: 'Title A→Z', value: 'title' },
];

export const ITEMS_PER_PAGE = 10;
