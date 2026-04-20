import type { IssueStats } from '../../types';
import { STATUS_COLORS } from '../../utils/constants';

interface StatsCardsProps {
  stats: IssueStats | null;
  loading?: boolean;
  activeStatus?: string | '';
  onStatusClick?: (status: string | '') => void;
}

const STAT_META = [
  { key: 'Open' as const, label: 'Open Issues', icon: '🔴', desc: 'Awaiting attention' },
  { key: 'In Progress' as const, label: 'In Progress', icon: '🔵', desc: 'Being worked on' },
  { key: 'Resolved' as const, label: 'Resolved', icon: '🟣', desc: 'Completed' },
];

export function StatsCards({ stats, loading, activeStatus, onStatusClick }: StatsCardsProps) {
  const total = stats ? Object.values(stats).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="stats-grid">
      <div 
        className={`stat-card stat-card-total ${activeStatus === '' ? 'active' : ''} ${onStatusClick ? 'clickable' : ''}`}
        onClick={() => onStatusClick?.('')}
      >
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <span className="stat-value">{loading ? '—' : total}</span>
          <span className="stat-label">Total Issues</span>
          <span className="stat-desc">All tracked items</span>
        </div>
        {activeStatus === '' && <div className="stat-active-indicator" />}
      </div>

      {STAT_META.map(({ key, label, icon, desc }) => {
        const colors = STATUS_COLORS[key];
        const count = stats?.[key] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        const isActive = activeStatus === key;

        return (
          <div
            key={key}
            className={`stat-card ${isActive ? 'active' : ''} ${onStatusClick ? 'clickable' : ''}`}
            style={{ 
              borderTop: `3px solid ${colors.border}`,
              backgroundColor: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)'
            }}
            onClick={() => onStatusClick?.(key)}
          >
            <div className="stat-icon">{isActive ? '✨' : icon}</div>
            <div className="stat-content">
              <span className="stat-value" style={{ color: isActive ? 'var(--primary)' : colors.text }}>
                {loading ? '—' : count}
              </span>
              <span className="stat-label">{label}</span>
              <span className="stat-desc">{isActive ? 'Filtering by this status' : desc}</span>
            </div>
            {!loading && total > 0 && (
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${pct}%`, backgroundColor: isActive ? 'var(--primary)' : colors.border }}
                />
              </div>
            )}
            {isActive && <div className="stat-active-indicator" />}
          </div>
        );
      })}
    </div>
  );
}
