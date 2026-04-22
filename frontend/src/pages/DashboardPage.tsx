import { Link } from 'react-router-dom';
import { useIssues } from '../hooks/useIssues';
import { StatsCards } from '../components/issues/StatsCards';
import { IssueFiltersBar } from '../components/issues/IssueFilters';
import { IssueCard } from '../components/issues/IssueCard';
import { Pagination } from '../components/ui/Pagination';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Plus, RefreshCcw, LayoutDashboard, SearchX } from 'lucide-react';

export default function DashboardPage() {
  const { 
    issues, 
    stats, 
    total, 
    filters, 
    loading, 
    pagination, 
    updateFilters, 
    goToPage, 
    refresh 
  } = useIssues();

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="header-title">
          <LayoutDashboard className="header-icon" />
          <div>
            <h1>Dashboard</h1>
            <p>Track and manage project issues</p>
          </div>
        </div>
        <div className="header-actions">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refresh} 
            disabled={loading}
            icon={<RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />}
          >
            Refresh
          </Button>
          <Link to="/issues/create">
            <Button variant="primary" icon={<Plus size={18} />}>
              Create Issue
            </Button>
          </Link>
        </div>
      </header>

      <StatsCards 
        stats={stats} 
        loading={loading && !stats} 
        activeStatus={filters.status}
        onStatusClick={(status) => updateFilters({ status: status as any })}
      />

      <section className="issues-section">
        <IssueFiltersBar 
          filters={filters} 
          onFilterChange={updateFilters} 
          onReset={() => updateFilters({ search: '', status: '', priority: '' })}
          total={total}
        />

        {loading && issues.length === 0 ? (
          <div className="empty-state">
            <Spinner size="lg" text="Loading issues..." />
          </div>
        ) : issues.length > 0 ? (
          <div className="issues-grid">
            {issues.map(issue => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={48} className="empty-icon" />
            <h3>No issues found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <Button variant="ghost" onClick={() => updateFilters({ search: '', status: '', priority: '' })}>
              Clear all filters
            </Button>
          </div>
        )}

        <Pagination 
          currentPage={filters.page}
          hasNext={!!pagination.next}
          hasPrev={!!pagination.prev}
          onPageChange={goToPage}
          total={total}
          limit={filters.limit}
        />
      </section>
    </div>
  );
}
