import { inject, injectable } from 'tsyringe';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { CreateTaskCommand } from '../../commands/CreateTaskCommand';
import { TaskDTO } from '../../dtos/TaskDTO';
import { Task } from '../../../domain/entities/Task';
@injectable()
export class CreateTaskUseCase {
  constructor(@inject('TaskRepository') private readonly repo: TaskRepository) {}

  async execute(cmd: CreateTaskCommand): Promise<TaskDTO> {
    const task = Task.create(cmd);
    await this.repo.save(task);
    return toDTO(task);
  }
}
const toDTO = (t: Task): TaskDTO => ({
  id: t.id.value,
  title: t.title,
  description: t.description,
  categoryId: t.categoryId,
  status: t.status,
  createdAt: t.createdAt.toISOString(),
  updatedAt: t.updatedAt.toISOString(),
});
