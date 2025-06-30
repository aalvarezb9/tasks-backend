import { inject, injectable } from 'tsyringe';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { TaskDTO } from '../../dtos/TaskDTO';
import { GetTasksQuery } from '../../queries/GetTasksQuery';

@injectable()
export class GetTasksUseCase {
  constructor(@inject('TaskRepository') private readonly repo: TaskRepository) {}

  async execute(
    query: GetTasksQuery = {}
  ): Promise<{ tasks: TaskDTO[]; total: number; page: number; limit: number }> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const { tasks, total } = await this.repo.findAll({ page, limit });
    return {
      tasks: tasks.map((t) => ({
        id: t.id.value,
        title: t.title,
        description: t.description,
        categoryId: t.categoryId,
        status: t.status,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }
}
