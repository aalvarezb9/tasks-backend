import { Task } from '../entities/Task';
import { TaskId } from '../value-objects/TaskId';

export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginatedTasks {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

export interface TaskRepository {
  findAll(p: Pagination): Promise<PaginatedTasks>;
  findById(id: TaskId): Promise<Task | null>;
  save(task: Task): Promise<void>;
  delete(id: TaskId): Promise<void>;
  findByUserId(userId: string, p: Pagination): Promise<PaginatedTasks>;
}
