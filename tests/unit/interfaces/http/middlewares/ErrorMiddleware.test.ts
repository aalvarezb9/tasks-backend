import { errorMiddleware } from '../../../../../src/interfaces/http/middlewares/ErrorMiddleware';

describe('ErrorMiddleware', () => {
  it('returns 500 + message', () => {
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    errorMiddleware(new Error('boom'), {} as any, res, {} as any);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'boom' });
  });
});
