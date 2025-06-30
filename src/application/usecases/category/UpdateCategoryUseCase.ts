import { inject, injectable } from 'tsyringe';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { UpdateCategoryCommand } from '../../commands/UpdateCategoryCommand';
import { CategoryDTO } from '../../dtos/CategoryDTO';
import { CategoryId } from '../../../domain/value-objects/CategoryId';
import { toDTO } from './helpers/toDto';

@injectable()
export class UpdateCategoryUseCase {
  constructor(@inject('CategoryRepository') private repo: CategoryRepository) {}

  async execute(cmd: UpdateCategoryCommand): Promise<CategoryDTO> {
    const cat = await this.repo.findById(CategoryId.from(cmd.id));
    if (!cat) throw new Error('Category not found');
    cat.update({ name: cmd.name, color: cmd.color });
    await this.repo.save(cat);
    return toDTO(cat);
  }
}
