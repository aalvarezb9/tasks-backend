import { container } from 'tsyringe';
import { CreateCategoryUseCase } from '../../../application/usecases/category/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '../../../application/usecases/category/UpdateCategoryUseCase';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { toDTO } from '../../../application/usecases/category/helpers/toDto';
import { CategoryId } from '../../../domain/value-objects/CategoryId';
import { CatchErrors } from '../decorators/CatchErrors';
import { RequireAuth } from '../decorators/RequireAuth';
import { Request, Response } from 'express';
import { ListCategoriesUseCase } from '../../../application/usecases/category/ListCategoryUseCase';

export class CategoryController {
  private static listUC = container.resolve(ListCategoriesUseCase);
  private static createUC = container.resolve(CreateCategoryUseCase);
  private static updateUC = container.resolve(UpdateCategoryUseCase);

  @CatchErrors
  @RequireAuth
  static async list(_req: Request, res: Response) {
    const cats = await this.listUC.execute();
    res.json(cats);
  }

  @CatchErrors
  @RequireAuth
  static async create(req: Request, res: Response) {
    const c = await this.createUC.execute(req.body);
    res.status(201).json(c);
  }

  @CatchErrors
  @RequireAuth
  static async update(req: Request, res: Response) {
    const c = await this.updateUC.execute({ id: req.params.id, ...req.body });
    res.json(c);
  }
}
