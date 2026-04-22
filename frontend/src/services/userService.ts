import api from './api';
import type { User } from '../types';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<{ success: boolean; data: User[] }>('/users');
    return response.data.data;
  },
};
