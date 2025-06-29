import { TaskDTO } from '../../../../src/application/dtos/TaskDTO';

describe('TaskDTO definition', () => {
  it('can be instantiated', () => {
    const dto: TaskDTO = {
      id: '1',
      title: 'T',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(dto.id).toBe('1');
  });
});
