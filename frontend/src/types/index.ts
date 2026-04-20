export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';
export type IssuePriority = 'Low' | 'Medium' | 'High';

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IssueStats {
  Open: number;
  'In Progress': number;
  Resolved: number;
}

export interface Pagination {
  next?: { page: number; limit: number };
  prev?: { page: number; limit: number };
}

export interface IssuesResponse {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: Issue[];
}

export interface IssueFormData {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

export interface IssueFilters {
  search: string;
  status: IssueStatus | '';
  priority: IssuePriority | '';
  sort: string;
  page: number;
  limit: number;
}
