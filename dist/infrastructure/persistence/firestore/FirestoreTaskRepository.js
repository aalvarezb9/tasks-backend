"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTaskRepository = void 0;
const Task_1 = require("../../../domain/entities/Task");
const FirestoreClient_1 = require("./FirestoreClient");
class FirestoreTaskRepository {
    async findAll({ page, limit }) {
        const offset = (page - 1) * limit;
        const snap = await FirestoreClient_1.tasksCollection
            .orderBy('createdAt', 'desc')
            .offset(offset)
            .limit(limit)
            .get();
        const totalSnap = await FirestoreClient_1.tasksCollection.get();
        return {
            tasks: snap.docs.map((d) => fromDoc(d.data())),
            total: totalSnap.size,
            page,
            limit,
        };
    }
    async findById(id) {
        const d = await FirestoreClient_1.tasksCollection.doc(id.value).get();
        return d.exists ? fromDoc(d.data()) : null;
    }
    async save(task) {
        await FirestoreClient_1.tasksCollection.doc(task.id.value).set(toDoc(task));
    }
    async delete(id) {
        await FirestoreClient_1.tasksCollection.doc(id.value).delete();
    }
}
exports.FirestoreTaskRepository = FirestoreTaskRepository;
const toDoc = (t) => ({
    id: t.id.value,
    title: t.title,
    description: t.description,
    category: t.category,
    status: t.status,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
});
const fromDoc = (d) => {
    const t = Task_1.Task.create({ title: d.title, description: d.description, category: d.category });
    t.update({ status: d.status });
    return t;
};
