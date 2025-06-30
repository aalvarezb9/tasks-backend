import {
  TaskRepository,
  PaginatedTasks,
  Pagination,
} from '../../../domain/repositories/TaskRepository';
import { Task } from '../../../domain/entities/Task';
import { TaskId } from '../../../domain/value-objects/TaskId';
import { tasksCollection } from './FirestoreClient';
import { TaskDTO } from '../../../application/dtos/TaskDTO';

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
      tasks: snap.docs.map((d) => fromDoc(d.data() as TaskDTO)),
      total: totalSnap.size,
      page,
      limit,
    };
  }

  async findById(id: TaskId) {
    const d = await tasksCollection.doc(id.value).get();
    return d.exists ? fromDoc(d.data() as TaskDTO) : null;
  }

  async save(task: Task) {
    await tasksCollection.doc(task.id.value).set(toDoc(task));
  }

  async delete(id: TaskId) {
    await tasksCollection.doc(id.value).delete();
  }
}

const toDoc = (t: Task) => {
  const doc: any = {
    id: t.id.value,
    title: t.title,
    description: t.description,
    status: t.status,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  };

  if (t.categoryId) doc.categoryId = t.categoryId;

  return doc;
};

const fromDoc = (d: TaskDTO): Task =>
  Task.hydrate(
    d.id,
    { title: d.title, description: d.description, categoryId: d.categoryId },
    d.status,
    d.createdAt,
    d.updatedAt
  );
