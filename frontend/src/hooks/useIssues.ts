import { useState, useEffect, useCallback, useRef } from 'react';
import { issueService } from '../services/issueService';
import type { Issue, IssueFilters, IssueStats, Pagination } from '../types';
import { ITEMS_PER_PAGE } from '../utils/constants';

const DEBOUNCE_MS = 400;

const defaultFilters: IssueFilters = {
  search: '',
  status: '',
  priority: '',
  sort: '-createdAt',
  page: 1,
  limit: ITEMS_PER_PAGE,
};

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [stats, setStats] = useState<IssueStats | null>(null);
  const [pagination, setPagination] = useState<Pagination>({});
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<IssueFilters>(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingFiltersRef = useRef<IssueFilters>(filters);

  const fetchIssues = useCallback(async (f: IssueFilters) => {
    setLoading(true);
    setError(null);
    try {
      const res = await issueService.getIssues(f);
      setIssues(res.data);
      setPagination(res.pagination);
      setTotal(res.count);
    } catch {
      setError('Failed to load issues. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const s = await issueService.getStats();
      setStats(s);
    } catch {
      // Non-critical
    }
  }, []);

  // Debounced search, immediate for non-text filters
  const updateFilters = useCallback((update: Partial<IssueFilters>, debounce = false) => {
    const next = { ...pendingFiltersRef.current, ...update, page: 1 };
    pendingFiltersRef.current = next;
    setFilters(next);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (debounce) {
      debounceRef.current = setTimeout(() => fetchIssues(next), DEBOUNCE_MS);
    } else {
      fetchIssues(next);
    }
  }, [fetchIssues]);

  const goToPage = useCallback((page: number) => {
    const next = { ...pendingFiltersRef.current, page };
    pendingFiltersRef.current = next;
    setFilters(next);
    fetchIssues(next);
  }, [fetchIssues]);

  const refresh = useCallback(() => {
    fetchIssues(pendingFiltersRef.current);
    fetchStats();
  }, [fetchIssues, fetchStats]);

  useEffect(() => {
    fetchIssues(defaultFilters);
    fetchStats();
  }, [fetchIssues, fetchStats]);

  return {
    issues,
    stats,
    pagination,
    total,
    filters,
    loading,
    error,
    updateFilters,
    goToPage,
    refresh,
  };
}
