import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUserUseCase } from '../../../application/usecases/auth/LoginUserUseCase';
import { CatchErrors } from '../decorators/CatchErrors';

export class AuthController {
  private static uc = container.resolve(LoginUserUseCase);

  @CatchErrors
  static async login(req: Request, res: Response) {
    const { token } = await this.uc.execute(req.body);
    res.json({ token });
  }
}
