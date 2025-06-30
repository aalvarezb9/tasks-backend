import admin from 'firebase-admin';
import { getApps, ServiceAccount } from 'firebase-admin/app';
import fs from 'fs';


function init() {
  if (process.env.FIREBASE_CONFIG) {        // Cloud Functions ― análisis y runtime
    admin.initializeApp();
    return;
  }

  const functionsEmulator = process.env.FUNCTIONS_EMULATOR;
  const kService = process.env.K_SERVICE;
  if (functionsEmulator !== 'true' && kService) {
    admin.initializeApp();
    return;
  }

  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (saPath && fs.existsSync(saPath)) {
    admin.initializeApp({ credential: admin.credential.cert(require(saPath)) });
    return;
  }

  if (process.env.SA_JSON) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.SA_JSON))
    });
    return;
  }

  throw new Error('No Firebase credentials found');
}


if (!getApps().length) init();

export const db = admin.firestore();
