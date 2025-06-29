import { CatchErrors } from '../../../../../src/interfaces/http/decorators/CatchErrors';

describe('CatchErrors decorator', () => {
  it('wraps async fn and forwards error', async () => {
    const err = new Error('x');
    const next = jest.fn();
    // Fake descriptor
    const method = CatchErrors({}, '', {
      value: async () => {
        throw err;
      },
    }) as any;
    await method({} as any, {} as any, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});
