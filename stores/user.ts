import { defineStore } from 'pinia';
import type { User } from "~/types/user";
import { get, post, put, del } from "~/utils/httpClient";
import { useMessage } from "~/composables/useMessage";
import { handleRequest } from "~/utils/helper";

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
  }),
  actions: {
    async fetchUsers(limit = 1000) {
      const { add } = useMessage();
      await handleRequest(async () => {
        this.users = await get<User[]>(`/users/?limit=${limit}`);
        this.users.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
      }, 'Error fetching users', add);
    },

    async fetchUserById(id: number) {
      const { add } = useMessage();
      await handleRequest(async () => {
        this.user = await get<User>(`/users/${id}`);
      }, 'Error fetching user', add);
    },

    async createUser(userData: Omit<User, 'id' | 'creationAt' | 'updatedAt'>) {
      const { add } = useMessage();
      await handleRequest(async () => {
        const newUser = await post<User>('/users', userData);
        this.users.push(newUser);
      }, 'Error creating user', add);
    },

    async updateUser(id: number, userData: Partial<Omit<User, 'id'>>) {
      const { add } = useMessage();
      await handleRequest(async () => {
        this.user = await put<User>(`/users/${id}`, userData);
      }, 'Error updating user', add);
    },

    async deleteUser(id: number) {
      const { add } = useMessage();
      await handleRequest(async () => {
        await del(`/users/${id}`);
        this.users = this.users.filter(user => user.id !== id);
      }, 'Error deleting user', add);
    },
  },
});
