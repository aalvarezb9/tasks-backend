import { TaskStatus } from '../../domain/entities/Task';

export interface TaskDTO {
  id: string;
  title: string;
  description?: string;
  categoryId?: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
