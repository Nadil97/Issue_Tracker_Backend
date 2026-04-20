import { useState, useEffect, useCallback } from 'react';
import { issueService } from '../services/issueService';
import type { Issue, IssueFormData } from '../types';

export function useIssue(id?: string) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIssue = useCallback(async (issueId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await issueService.getIssue(issueId);
      setIssue(data);
    } catch {
      setError('Failed to load issue.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) fetchIssue(id);
  }, [id, fetchIssue]);

  const createIssue = async (data: IssueFormData): Promise<Issue> => {
    setSubmitting(true);
    try {
      const created = await issueService.createIssue(data);
      return created;
    } finally {
      setSubmitting(false);
    }
  };

  const updateIssue = async (issueId: string, data: Partial<IssueFormData>): Promise<Issue> => {
    setSubmitting(true);
    try {
      const updated = await issueService.updateIssue(issueId, data);
      setIssue(updated);
      return updated;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteIssue = async (issueId: string): Promise<void> => {
    setSubmitting(true);
    try {
      await issueService.deleteIssue(issueId);
    } finally {
      setSubmitting(false);
    }
  };

  return { issue, loading, submitting, error, createIssue, updateIssue, deleteIssue };
}
