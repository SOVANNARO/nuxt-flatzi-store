import type { Toast } from "~/types/toast";

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options).replace(',', ' |');
}

export async function handleRequest(
    callback,
    errorMessage: string,
    addToast: (toast: Omit<Toast, 'id'>) => void
) {
  try {
    await callback();
  } catch (error) {
    const errorDescription = error instanceof Error ? error.message : 'An unexpected error occurred';
    addToast({
      title: 'Error',
      description: `${errorMessage}: ${errorDescription}`,
      color: 'red',
    });
  }
}
