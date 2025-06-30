"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreCategoryRepository = void 0;
const Category_1 = require("../../../domain/entities/Category");
const firebase_1 = require("../../../config/firebase");
const categoriesCollection = firebase_1.db.collection('categories');
class FirestoreCategoryRepository {
    async findAll(p) {
        const snap = await categoriesCollection.orderBy('name').get();
        return {
            categories: snap.docs.map((d) => fromDoc(d.data())),
            total: snap.size,
            page: p.page,
            limit: p.limit,
        };
    }
    async findById(id) {
        const d = await categoriesCollection.doc(id.value).get();
        return d.exists ? fromDoc(d.data()) : null;
    }
    async save(cat) {
        await categoriesCollection.doc(cat.id.value).set(toDoc(cat));
    }
    async delete(id) {
        await categoriesCollection.doc(id.value).delete();
    }
}
exports.FirestoreCategoryRepository = FirestoreCategoryRepository;
const toDoc = (c) => ({
    id: c.id.value,
    name: c.name,
    color: c.color,
    createdAt: c.createdAt.toISOString(),
});
const fromDoc = (d) => Category_1.Category.hydrate(d.id, { name: d.name, color: d.color }, d.createdAt);
