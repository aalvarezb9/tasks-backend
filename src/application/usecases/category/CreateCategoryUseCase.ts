import { inject, injectable } from 'tsyringe';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { CreateCategoryCommand } from '../../commands/CreateCategoryCommand';
import { CategoryDTO } from '../../dtos/CategoryDTO';
import { Category } from '../../../domain/entities/Category';
import { toDTO } from './helpers/toDto';

@injectable()
export class CreateCategoryUseCase {
  constructor(@inject('CategoryRepository') private repo: CategoryRepository) {}

  async execute(cmd: CreateCategoryCommand): Promise<CategoryDTO> {
    const cat = Category.create({ name: cmd.name, color: cmd.color });
    await this.repo.save(cat);
    return toDTO(cat);
  }
}
