import { AxiosError } from 'axios';
import { isErrorDetail, isErrorResponse } from '@/utils/type-guards';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (isErrorResponse(data)) {
      // A validation error states the specific reason in its details; its top-level
      // message is generic ("Validation failed").
      const detail = data.error.details?.find(isErrorDetail);

      return detail?.message ?? data.error.message;
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
