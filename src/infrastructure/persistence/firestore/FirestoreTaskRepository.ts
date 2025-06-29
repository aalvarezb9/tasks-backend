import {
  TaskRepository,
  PaginatedTasks,
  Pagination,
} from '../../../domain/repositories/TaskRepository';
import { Task } from '../../../domain/entities/Task';
import { TaskId } from '../../../domain/value-objects/TaskId';
import { tasksCollection } from './FirestoreClient';

export class FirestoreTaskRepository implements TaskRepository {
  async findAll({ page, limit }: Pagination): Promise<PaginatedTasks> {
    const offset = (page - 1) * limit;
    const snap = await tasksCollection
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();
    const totalSnap = await tasksCollection.get();

    return {
      tasks: snap.docs.map((d) => fromDoc(d.data())),
      total: totalSnap.size,
      page,
      limit,
    };
  }

  async findById(id: TaskId) {
    const d = await tasksCollection.doc(id.value).get();
    return d.exists ? fromDoc(d.data()!) : null;
  }

  async save(task: Task) {
    await tasksCollection.doc(task.id.value).set(toDoc(task));
  }

  async delete(id: TaskId) {
    await tasksCollection.doc(id.value).delete();
  }
}

const toDoc = (t: Task) => ({
  id: t.id.value,
  title: t.title,
  description: t.description,
  category: t.category,
  status: t.status,
  createdAt: t.createdAt.toISOString(),
  updatedAt: t.updatedAt.toISOString(),
});

const fromDoc = (d: any): Task => {
  const t = Task.create({ title: d.title, description: d.description, category: d.category });
  t.update({ status: d.status });
  return t;
};
