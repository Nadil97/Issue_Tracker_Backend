import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { IssueFilters } from '../../types';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '../../utils/constants';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';

interface IssueFiltersProps {
  filters: IssueFilters;
  onFilterChange: (update: Partial<IssueFilters>, debounce?: boolean) => void;
  onReset: () => void;
  total: number;
}

export function IssueFiltersBar({ filters, onFilterChange, onReset, total }: IssueFiltersProps) {
  const hasActiveFilters = filters.search || filters.status || filters.priority;

  const ActiveFilterChip = ({ label, value, onRemove }: { label: string, value: string, onRemove: () => void }) => (
    <div className="filter-chip">
      <span className="chip-label">{label}:</span>
      <span className="chip-value">{value}</span>
      <button className="chip-remove" onClick={onRemove}><X size={14} /></button>
    </div>
  );

  return (
    <div className="filters-container">
      <div className="search-section">
        <div className="search-bar-primary">
          <Input
            id="search-input"
            placeholder="Search issues by title or description..."
            value={filters.search}
            icon={<Search size={20} />}
            onChange={(e) => onFilterChange({ search: e.target.value }, true)}
            className="search-input-large"
          />
          <div className="result-indicator">
            <span className="count-badge">{total}</span>
            <span className="count-label">Results</span>
          </div>
        </div>
      </div>

      <div className="controls-row">
        <div className="filters-inline">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <Select
              id="status-filter"
              value={filters.status}
              options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
              placeholder="All Statuses"
              onChange={(e) => onFilterChange({ status: e.target.value as IssueFilters['status'] })}
              className="filter-select-minimal"
            />
          </div>

          <div className="filter-group">
            <SlidersHorizontal size={16} className="filter-icon" />
            <Select
              id="priority-filter"
              value={filters.priority}
              options={PRIORITY_OPTIONS.map((p) => ({ label: p, value: p }))}
              placeholder="All Priorities"
              onChange={(e) => onFilterChange({ priority: e.target.value as IssueFilters['priority'] })}
              className="filter-select-minimal"
            />
          </div>

          <div className="sort-group">
            <Select
              id="sort-filter"
              value={filters.sort}
              options={SORT_OPTIONS}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
              className="filter-select-minimal"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="clear-all-btn">
            Reset All
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="active-chips-row">
          {filters.search && (
            <ActiveFilterChip label="Search" value={`"${filters.search}"`} onRemove={() => onFilterChange({ search: '' })} />
          )}
          {filters.status && (
            <ActiveFilterChip label="Status" value={filters.status} onRemove={() => onFilterChange({ status: '' })} />
          )}
          {filters.priority && (
            <ActiveFilterChip label="Priority" value={filters.priority} onRemove={() => onFilterChange({ priority: '' })} />
          )}
        </div>
      )}
    </div>
  );
}
