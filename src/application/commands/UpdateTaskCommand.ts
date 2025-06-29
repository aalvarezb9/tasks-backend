import { TaskStatus } from '../../domain/entities/Task';

export interface UpdateTaskCommand {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  status?: TaskStatus;
}
