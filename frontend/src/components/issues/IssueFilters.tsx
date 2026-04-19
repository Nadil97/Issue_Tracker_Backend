import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { IssueFilters } from '../../types';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '../../utils/constants';

interface IssueFiltersProps {
  filters: IssueFilters;
  onFilterChange: (update: Partial<IssueFilters>, debounce?: boolean) => void;
  onReset: () => void;
  total: number;
}

export function IssueFiltersBar({ filters, onFilterChange, onReset, total }: IssueFiltersProps) {
  const hasActiveFilters = filters.search || filters.status || filters.priority;

  return (
    <div className="filters-bar">
      <div className="filters-row">
        <div className="search-wrapper">
          <Input
            id="search-input"
            placeholder="Search by title…"
            value={filters.search}
            icon={<span>🔍</span>}
            onChange={(e) => onFilterChange({ search: e.target.value }, true)}
          />
        </div>

        <Select
          id="status-filter"
          value={filters.status}
          options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
          placeholder="All Statuses"
          onChange={(e) => onFilterChange({ status: e.target.value as IssueFilters['status'] })}
        />

        <Select
          id="priority-filter"
          value={filters.priority}
          options={PRIORITY_OPTIONS.map((p) => ({ label: p, value: p }))}
          placeholder="All Priorities"
          onChange={(e) => onFilterChange({ priority: e.target.value as IssueFilters['priority'] })}
        />

        <Select
          id="sort-filter"
          value={filters.sort}
          options={SORT_OPTIONS}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            ✕ Clear
          </Button>
        )}
      </div>

      <p className="filters-count">
        <strong>{total}</strong> {total === 1 ? 'issue' : 'issues'} found
      </p>
    </div>
  );
}
