import api from './api';
import type { User, AuthCredentials, RegisterData } from '../types';

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },

  async login(data: AuthCredentials): Promise<User> {
    const response = await api.post<User>('/auth/login', data);
    return response.data;
  },
};
