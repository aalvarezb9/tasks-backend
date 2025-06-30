import admin from 'firebase-admin';
import { getApps, ServiceAccount } from 'firebase-admin/app';
import fs from 'fs';


function init() {
  admin.initializeApp();
}

if (!getApps().length) init();

export const db = admin.firestore();
