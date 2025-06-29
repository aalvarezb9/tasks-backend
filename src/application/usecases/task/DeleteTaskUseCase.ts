import { inject, injectable } from 'tsyringe';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { DeleteTaskCommand } from '../../commands/DeleteTaskCommand';
import { TaskId } from '../../../domain/value-objects/TaskId';
@injectable()
export class DeleteTaskUseCase {
  constructor(@inject('TaskRepository') private readonly repo: TaskRepository) {}
  execute(cmd: DeleteTaskCommand) {
    return this.repo.delete(TaskId.from(cmd.id));
  }
}
