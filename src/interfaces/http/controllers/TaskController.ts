import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTaskUseCase } from '../../../application/usecases/task/CreateTaskUseCase';
import { UpdateTaskUseCase } from '../../../application/usecases/task/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../../application/usecases/task/DeleteTaskUseCase';
import { GetTasksUseCase } from '../../../application/usecases/task/GetTasksUseCase';
import { CatchErrors } from '../decorators/CatchErrors';
import { RequireAuth } from '../decorators/RequireAuth';

export class TaskController {
  private static createUC = container.resolve(CreateTaskUseCase);
  private static listUC = container.resolve(GetTasksUseCase);
  private static updateUC = container.resolve(UpdateTaskUseCase);
  private static deleteUC = container.resolve(DeleteTaskUseCase);

  @CatchErrors
  @RequireAuth
  static async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this.listUC.execute({ page, limit });
    res.json(result);
  }

  @CatchErrors
  @RequireAuth
  static async create(req: Request, res: Response) {
    const t = await this.createUC.execute(req.body);
    res.status(201).json(t);
  }

  @CatchErrors
  @RequireAuth
  static async update(req: Request, res: Response) {
    const t = await this.updateUC.execute({ id: req.params.id, ...req.body });
    res.json(t);
  }

  @CatchErrors
  @RequireAuth
  static async delete(req: Request, res: Response) {
    await this.deleteUC.execute({ id: req.params.id });
    res.status(204).send();
  }
}
