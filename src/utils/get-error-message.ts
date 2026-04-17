import { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types/api';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;

    if (data?.error?.message) {
      return data.error.message;
    }

    if (error.message === 'Network Error') {
      return 'Unable to connect to the server';
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};
