import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../../../application/usecases/user/CreateUserUseCase';
import { FindUserUseCase } from '../../../application/usecases/user/FindUserUseCase';
import { CatchErrors } from '../decorators/CatchErrors';
import { RequireAuth } from '../decorators/RequireAuth';

export class UserController {
  private static createUC = container.resolve(CreateUserUseCase);
  private static findUC = container.resolve(FindUserUseCase);

  @CatchErrors
  @RequireAuth
  static async create(req: Request, res: Response) {
    const u = await this.createUC.execute(req.body);
    res.status(201).json(u);
  }

  @CatchErrors
  @RequireAuth
  static async find(req: Request, res: Response) {
    const u = await this.findUC.execute({ email: req.query.email as string });
    if (!u) return res.status(404).json({ message: 'User not found' });

    res.json(u);
  }
}
