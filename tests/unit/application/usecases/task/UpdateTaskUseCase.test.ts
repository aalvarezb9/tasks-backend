import { UpdateTaskUseCase } from '../../../../../src/application/usecases/task/UpdateTaskUseCase';
import { TaskRepository } from '../../../../../src/domain/repositories/TaskRepository';
import { TaskId } from '../../../../../src/domain/value-objects/TaskId';

const repo: jest.Mocked<TaskRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
const uc = new UpdateTaskUseCase(repo);

it('throws if task not found', async () => {
  repo.findById.mockResolvedValue(null);
  await expect(uc.execute({ id: TaskId.create().value, title: 'x' })).rejects.toThrow(
    'Task not found'
  );
});
