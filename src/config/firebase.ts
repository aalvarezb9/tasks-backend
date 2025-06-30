import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const creds = require('../../../keys/tasks-collection-82ded-firebase-adminsdk-fbsvc-50d50660f0.json');

if (!getApps().length)
  admin.initializeApp({
    credential: admin.credential.cert(creds),
  });

export const db = admin.firestore();
