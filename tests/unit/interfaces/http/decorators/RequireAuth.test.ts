import { RequireAuth } from '../../../../../src/interfaces/http/decorators/RequireAuth';
import jwt from 'jsonwebtoken';
import { env } from '../../../../../src/config/env';

describe('RequireAuth decorator', () => {
  it('returns 401 when header missing', async () => {
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //@ts-ignore
    await RequireAuth(null, null, { value: (_req, _res: any) => null }).value(
      { headers: {} },
      res,
      jest.fn()
    );
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('passes through with valid token', async () => {
    const token = jwt.sign({ sub: '1' }, env.jwtSecret);
    const next = jest.fn();
    //@ts-ignore
    const fn = RequireAuth(null, null, {
      value: (_req, _res, _next) => {
        _next();
      },
    }).value;
    await fn({ headers: { authorization: `Bearer ${token}` } }, {}, next);
    expect(next).toHaveBeenCalled();
  });
});
