import { inject, injectable } from 'tsyringe';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { Pagination } from '../../../domain/repositories/Pagination';


@injectable()
export class ListCategoriesUseCase {
  constructor(@inject('CategoryRepository') private repo: CategoryRepository) {}

  async execute(p: Partial<Pagination> = {}) {
    const page  = p.page  && p.page  > 0 ? p.page  : 1;
    const limit = p.limit && p.limit > 0 ? p.limit : 10;
    const { categories, total } = await this.repo.findAll({ page, limit });
    return {
      categories: categories.map(c => ({
        id: c.id.value,
        name: c.name,
        color: c.color,
        createdAt: c.createdAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }
}
