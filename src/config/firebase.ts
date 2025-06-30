import admin from 'firebase-admin';
import { getApps, ServiceAccount } from 'firebase-admin/app';
import fs from 'fs';


function init() {
  if (process.env.FUNCTIONS_EMULATOR !== 'true' && process.env.K_SERVICE) {
    admin.initializeApp();
    return;
  }

  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (saPath && fs.existsSync(saPath)) {
    const sa = JSON.parse(fs.readFileSync(saPath, 'utf8'));
    admin.initializeApp({ credential: admin.credential.cert(sa) });
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
