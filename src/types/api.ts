export interface SuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ErrorDetail {
  field?: string;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    /**
     * Holds `ErrorDetail` items for validation errors; other errors may carry
     * differently shaped entries, such as `{ retryAfter }` for rate limiting.
     * The specification does not require the field.
     */
    details?: unknown[];
  };
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
