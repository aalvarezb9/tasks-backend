import { CreateTaskCommand } from '../../../../src/application/commands/CreateTaskCommand';

describe('CreateTaskCommand typing', () => {
  it('accepts valid payload', () => {
    const cmd: CreateTaskCommand = { title: 'Hello', description: 'd', category: 'c' };
    expect(cmd.title).toBe('Hello');
  });
});
