import type { IssueStatus, IssuePriority } from '../../types';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';

interface StatusBadgeProps {
  status: IssueStatus;
}

interface PriorityBadgeProps {
  priority: IssuePriority;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status];
  const dots: Record<IssueStatus, string> = {
    Open: '●',
    'In Progress': '◉',
    Resolved: '✓',
  };

  return (
    <span
      className="badge"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span className="badge-dot">{dots[status]}</span>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = PRIORITY_COLORS[priority];
  const icons: Record<IssuePriority, string> = {
    Low: '↓',
    Medium: '→',
    High: '↑',
  };

  return (
    <span
      className="badge"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span className="badge-dot">{icons[priority]}</span>
      {priority}
    </span>
  );
}
