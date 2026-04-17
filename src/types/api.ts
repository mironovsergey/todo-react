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
    details: ErrorDetail[];
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
