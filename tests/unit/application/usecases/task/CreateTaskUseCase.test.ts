import { CreateTaskUseCase } from '../../../../../src/application/usecases/task/CreateTaskUseCase';
import { TaskRepository } from '../../../../../src/domain/repositories/TaskRepository';
import { TaskId } from '../../../../../src/domain/value-objects/TaskId';

const repo: jest.Mocked<TaskRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
const uc = new CreateTaskUseCase(repo);

it('creates task', async () => {
  const task = await uc.execute({ title: 'x' });
  expect(task.title).toBe('x');
});
