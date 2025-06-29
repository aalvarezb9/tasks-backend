jest.mock('../../../../src/infrastructure/persistence/firestore/FirestoreClient', () => {
  const docs: Record<string, any> = {};
  return {
    tasksCollection: {
      doc: (id: string) => ({
        set: (d: any) => {
          docs[id] = d;
          return Promise.resolve();
        },
        get: () => Promise.resolve({ exists: !!docs[id], data: () => docs[id] }),
        delete: () => {
          delete docs[id];
          return Promise.resolve();
        },
      }),
      orderBy: () => ({
        offset: () => ({
          limit: () => ({
            get: () =>
              Promise.resolve({ docs: Object.values(docs).map((d) => ({ data: () => d })) }),
          }),
        }),
      }),
      get: () =>
        Promise.resolve({
          size: Object.keys(docs).length,
          docs: Object.values(docs).map((d) => ({ data: () => d })),
        }),
    },
  };
});

import { FirestoreTaskRepository } from '../../../../src/infrastructure/persistence/firestore/FirestoreTaskRepository';
import { Task } from '../../../../src/domain/entities/Task';

describe('FirestoreTaskRepository', () => {
  const repo = new FirestoreTaskRepository();
  it('saves and retrieves task', async () => {
    const t = Task.create({ title: 'repo' });
    await repo.save(t);
    const found = await repo.findById(t.id);
    expect(found?.title).toBe('repo');
  });

  it('deletes task', async () => {
    const t = Task.create({ title: 'del' });
    await repo.save(t);
    await repo.delete(t.id);
    const f = await repo.findById(t.id);
    expect(f).toBeNull();
  });
});
