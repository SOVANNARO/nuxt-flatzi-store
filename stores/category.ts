import { defineStore } from 'pinia';
import type { Category } from "~/types/category";
import { get, post, put, del } from "~/utils/httpClient";
import { useMessage } from "~/composables/useMessage";
import { handleRequest } from "~/utils/helper";

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    category: null as Category | null,
  }),
  actions: {
    async fetchCategories(limit = 1000) {
      const { add } = useMessage();
      await handleRequest(async () => {
        this.categories = await get<Category[]>(`/categories/?limit=${limit}`);
        this.categories.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
      }, 'Error fetching categories', add);
    },

    async fetchCategoryById(id: number) {
      const { add } = useMessage();
      await handleRequest(async () => {
        this.category = await get<Category>(`/categories/${id}`);
      }, 'Error fetching category', add);
    },

    async createCategory(categoryData: Omit<Category, 'id' | 'creationAt' | 'updatedAt'>) {
      const { add } = useMessage();
      await handleRequest(async () => {
        const newCategory = await post<Category>('/categories', categoryData);
        this.categories.push(newCategory);
      }, 'Error creating category', add);
    },

    async updateCategory(id: number, categoryData: Partial<Omit<Category, 'id'>>) {
      const { add } = useMessage();
      await handleRequest(async () => {
        this.category = await put<Category>(`/categories/${id}`, categoryData);
      }, 'Error updating category', add);
    },

    async deleteCategory(id: number) {
      const { add } = useMessage();
      await handleRequest(async () => {
        await del(`/categories/${id}`);
        this.categories = this.categories.filter(category => category.id !== id);
      }, 'Error deleting category', add);
    },
  },
});
