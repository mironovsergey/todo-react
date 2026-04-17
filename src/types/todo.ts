export type Priority = 'low' | 'medium' | 'high';

export type SortBy = 'createdAt' | 'updatedAt' | 'priority' | 'title';

export type SortOrder = 'asc' | 'desc';

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoInput {
  title: string;
  description?: string;
  priority?: Priority;
  tags?: string[];
}

export interface TodoUpdate {
  title?: string;
  description?: string | null;
  priority?: Priority;
  tags?: string[];
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
  totalTags: number;
  topTags: TodoTag[];
}

export interface TodoTag {
  tag: string;
  count: number;
}

export interface TodosQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  order?: SortOrder;
  completed?: boolean;
  priority?: Priority;
  search?: string;
  tags?: string;
}
