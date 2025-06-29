import { db } from '../../../config/firebase';

export const tasksCollection = db.collection('tasks');
export const usersCollection = db.collection('users');
