import { ref } from 'vue';
import type { Toast } from "~/types/toast";

const toasts = ref<Toast[]>([]);
let toastId = 0;

export function useMessage() {
  const add = (toast: Omit<Toast, 'id'>) => {
    const id = toastId++;
    toasts.value.push({ id, ...toast });
    setTimeout(() => remove(id), 5000);
  };

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  };

  return { toasts, add, remove };
}