import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { usersCollection } from './FirestoreClient';

export class FirestoreUserRepository implements UserRepository {
  async findByEmail(email: Email) {
    const q = await usersCollection.where('email', '==', email.value).limit(1).get();
    if (q.empty) return null;
    return fromDoc(q.docs[0].data());
  }

  async save(u: User) {
    await usersCollection.doc(u.id.value).set(toDoc(u));
  }
}

const toDoc = (u: User) => ({
  id: u.id.value,
  email: u.email.value,
  name: u.name,
  password: u.password().value(),
  createdAt: u.createdAt.toISOString(),
});

const fromDoc = (d: any): User =>
  User.hydrate(d.id, d.email, d.password, { name: d.name }, d.createdAt);
