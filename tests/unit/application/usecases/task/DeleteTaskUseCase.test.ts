import { DeleteTaskUseCase } from '../../../../../src/application/usecases/task/DeleteTaskUseCase';
import { TaskRepository } from '../../../../../src/domain/repositories/TaskRepository';
import { TaskId } from '../../../../../src/domain/value-objects/TaskId';

const repo: jest.Mocked<TaskRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
const uc = new DeleteTaskUseCase(repo);

it('deletes task', async () => {
  const id = TaskId.create();
  await uc.execute({ id: id.value });
  expect(repo.delete).toHaveBeenCalledWith(id);
});
