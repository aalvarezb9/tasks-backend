import { inject, injectable } from 'tsyringe';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { UpdateTaskCommand } from '../../commands/UpdateTaskCommand';
import { TaskDTO } from '../../dtos/TaskDTO';
import { TaskId } from '../../../domain/value-objects/TaskId';

@injectable()
export class UpdateTaskUseCase {
  constructor(@inject('TaskRepository') private readonly repo: TaskRepository) {}

  async execute(cmd: UpdateTaskCommand): Promise<TaskDTO> {
    const task = await this.repo.findById(TaskId.from(cmd.id));
    if (!task) throw new Error('Task not found');

    task.update(cmd);
    await this.repo.save(task);
    return {
      id: task.id.value,
      title: task.title,
      description: task.description,
      categoryId: task.categoryId,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }
}
