import { formatDistanceToNow, format } from 'date-fns';

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatRelativeDate = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.slice(0, length) + '...' : str;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
