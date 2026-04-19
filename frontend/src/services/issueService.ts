import api from './api';
import type { Issue, IssueFormData, IssueStats, IssuesResponse, IssueFilters } from '../types';

export const issueService = {
  async getIssues(filters: Partial<IssueFilters>): Promise<IssuesResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const response = await api.get<IssuesResponse>(`/issues?${params.toString()}`);
    return response.data;
  },

  async getIssue(id: string): Promise<Issue> {
    const response = await api.get<{ success: boolean; data: Issue }>(`/issues/${id}`);
    return response.data.data;
  },

  async createIssue(data: IssueFormData): Promise<Issue> {
    const response = await api.post<{ success: boolean; data: Issue }>('/issues', data);
    return response.data.data;
  },

  async updateIssue(id: string, data: Partial<IssueFormData>): Promise<Issue> {
    const response = await api.put<{ success: boolean; data: Issue }>(`/issues/${id}`, data);
    return response.data.data;
  },

  async deleteIssue(id: string): Promise<void> {
    await api.delete(`/issues/${id}`);
  },

  async getStats(): Promise<IssueStats> {
    const response = await api.get<{ success: boolean; data: IssueStats }>('/issues/stats');
    return response.data.data;
  },
};
