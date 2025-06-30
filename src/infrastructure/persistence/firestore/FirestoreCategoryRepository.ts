import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { Category } from '../../../domain/entities/Category';
import { CategoryId } from '../../../domain/value-objects/CategoryId';
import { db } from '../../../config/firebase';
import { Pagination } from '../../../domain/repositories/Pagination';

const categoriesCollection = db.collection('categories');

export class FirestoreCategoryRepository implements CategoryRepository {
  async findAll(p: Pagination) {
    const snap = await categoriesCollection.orderBy('name').get();
    return {
      categories: snap.docs.map(d => fromDoc(d.data())),
      total: snap.size,
      page: p.page,
      limit: p.limit
    };
  }

  async findById(id: CategoryId) {
    const d = await categoriesCollection.doc(id.value).get();
    return d.exists ? fromDoc(d.data()!) : null;
  }

  async save(cat: Category) {
    await categoriesCollection.doc(cat.id.value).set(toDoc(cat));
  }

  async delete(id: CategoryId) {
    await categoriesCollection.doc(id.value).delete();
  }
}

const toDoc = (c: Category) => ({
  id: c.id.value,
  name: c.name,
  color: c.color,
  createdAt: c.createdAt.toISOString()
});

const fromDoc = (d: any): Category =>
Category.create({ name: d.name, color: d.color });
