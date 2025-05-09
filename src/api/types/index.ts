export interface APIResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginationRequest {
  page?: number;
  pageSize?: number;
  searchValue?: string;
  searchField?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface TableResponse<T> {
  data: T;
  pagination: TablePagination;
}
