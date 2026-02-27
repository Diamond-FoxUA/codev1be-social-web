import { nextServer } from './api';
import type { Story } from '@/types/story';
import type { User } from '@/types/user';

// --- Типи для запитів ---
export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// --- AUTH API ---
export const register = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post('api/auth/register', userData);
  return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post('api/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('api/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get('api/users/me');
  return data;
};

// --- USERS ---
export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const { data } = await nextServer.patch('/api/users/me', userData);
  return data;
};

export const updateUserAvatar = async (formData: FormData): Promise<User> => {
  const { data } = await nextServer.patch('/api/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// --- STORIES ---
export const fetchStories = async () => {
  const { data } = await nextServer.get('/api/stories');
  return data;
};

export const fetchPopularStories = async () => {
  const { data } = await nextServer.get('/api/stories/popular');
  return data;
};

export const fetchMyStories = async () => {
  const { data } = await nextServer.get('/api/stories/me');
  return data;
};

export const fetchStoryById = async (storyId: string): Promise<Story> => {
  const { data } = await nextServer.get(`/api/stories/${storyId}`);
  return data;
};

export const createStory = async (formData: FormData): Promise<Story> => {
  const { data } = await nextServer.post('/api/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateStory = async (
  storyId: string,
  formData: FormData,
): Promise<Story> => {
  const { data } = await nextServer.patch(`/api/stories/${storyId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const addToFavorites = async (storyId: string) => {
  const { data } = await nextServer.post(`/api/stories/${storyId}/save`);
  return data;
};

export const removeFromFavorites = async (storyId: string) => {
  const { data } = await nextServer.delete(`/api/stories/${storyId}/save`);
  return data;
};

export const fetchFavoriteStories = async () => {
  const { data } = await nextServer.get('/api/stories/saved');
  return data;
};
