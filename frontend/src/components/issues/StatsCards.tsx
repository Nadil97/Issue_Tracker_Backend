import type { IssueStats } from '../../types';
import { STATUS_COLORS } from '../../utils/constants';

interface StatsCardsProps {
  stats: IssueStats | null;
  loading?: boolean;
}

const STAT_META = [
  { key: 'Open' as const, label: 'Open Issues', icon: '🔴', desc: 'Awaiting attention' },
  { key: 'In Progress' as const, label: 'In Progress', icon: '🔵', desc: 'Being worked on' },
  { key: 'Resolved' as const, label: 'Resolved', icon: '🟣', desc: 'Completed' },
];

export function StatsCards({ stats, loading }: StatsCardsProps) {
  const total = stats ? Object.values(stats).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card stat-card-total">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <span className="stat-value">{loading ? '—' : total}</span>
          <span className="stat-label">Total Issues</span>
          <span className="stat-desc">All tracked items</span>
        </div>
      </div>

      {STAT_META.map(({ key, label, icon, desc }) => {
        const colors = STATUS_COLORS[key];
        const count = stats?.[key] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;

        return (
          <div
            key={key}
            className="stat-card"
            style={{ borderTop: `3px solid ${colors.border}` }}
          >
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
              <span className="stat-value" style={{ color: colors.text }}>
                {loading ? '—' : count}
              </span>
              <span className="stat-label">{label}</span>
              <span className="stat-desc">{desc}</span>
            </div>
            {!loading && total > 0 && (
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${pct}%`, backgroundColor: colors.border }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
