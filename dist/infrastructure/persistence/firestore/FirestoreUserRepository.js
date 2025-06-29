"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const User_1 = require("../../../domain/entities/User");
const FirestoreClient_1 = require("./FirestoreClient");
class FirestoreUserRepository {
    async findByEmail(email) {
        const q = await FirestoreClient_1.usersCollection.where('email', '==', email.value).limit(1).get();
        if (q.empty)
            return null;
        return fromDoc(q.docs[0].data());
    }
    async save(u) {
        await FirestoreClient_1.usersCollection.doc(u.id.value).set(toDoc(u));
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
const toDoc = (u) => ({
    id: u.id.value,
    email: u.email.value,
    name: u.name,
    password: u.password().value(),
    createdAt: u.createdAt.toISOString(),
});
const fromDoc = (d) => User_1.User.hydrate(d.id, d.email, d.password, { name: d.name }, d.createdAt);
