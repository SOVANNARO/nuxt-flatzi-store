import { defineStore } from 'pinia';
import type { User } from "~/types/user";
import { get, post, put, del } from "~/utils/httpClient";

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
  }),
  actions: {
    async fetchUsers(limit = 1000) {
      await this.handleRequest(async () => {
        this.users = await get<User[]>(`/users/?limit=${limit}`);
      }, 'Error fetching users');
    },
    async fetchUserById(id: number) {
      await this.handleRequest(async () => {
        this.user = await get<User>(`/users/${id}`);
      }, 'Error fetching user');
    },
    async createUser(userData: Omit<User, 'id' | 'creationAt' | 'updatedAt'>) {
      await this.handleRequest(async () => {
        const newUser = await post<User>('/users/', userData);
        this.users.push(newUser);
      }, 'Error creating user');
    },
    async updateUser(id: number, userData: Partial<Omit<User, 'id'>>) {
      await this.handleRequest(async () => {
        this.user = await put<User>(`/users/${id}`, userData);
      }, 'Error updating user');
    },
    async deleteUser(id: number) {
      await this.handleRequest(async () => {
        await del(`/users/${id}`);
        this.users = this.users.filter(user => user.id !== id);
      }, 'Error deleting user');
    },
    async handleRequest(callback: () => Promise<void>, errorMessage: string) {
      try {
        await callback();
      } catch (error) {
        console.error(errorMessage, error);
      }
    },
  },
});
