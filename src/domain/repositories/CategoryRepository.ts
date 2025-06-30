import { Category } from '../entities/Category';
import { CategoryId } from '../value-objects/CategoryId';
import { Pagination } from './Pagination';

export interface PaginatedCategories {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoryRepository {
  findAll(p: Pagination): Promise<PaginatedCategories>;
  findById(id: CategoryId): Promise<Category | null>;
  save(cat: Category): Promise<void>;
  delete(id: CategoryId): Promise<void>;
}
