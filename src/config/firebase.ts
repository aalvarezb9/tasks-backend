import admin from 'firebase-admin';
import { getApps, ServiceAccount } from 'firebase-admin/app';
import fs from 'fs';


function init() {
  const functionsEmulator = process.env.FUNCTIONS_EMULATOR;
  const kService = process.env.K_SERVICE;
  console.log('functionsEmulator', functionsEmulator);
  console.log('kService', kService);
  if (functionsEmulator !== 'true' && kService) {
    admin.initializeApp();
    return;
  }

  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  console.log('process.env', process.env);
  console.log('saPath', saPath);
  if (saPath && fs.existsSync(saPath)) {
    const sa = require(saPath);
    console.log('sa', sa);
    admin.initializeApp({ credential: admin.credential.cert(sa) });
    return;
  }

  const saJson = process.env.SA_JSON;
  console.log('saJson', saJson);
  if (saJson) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(saJson))
    });
    return;
  }

  const googleApplicationCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  console.log('googleApplicationCredentials', googleApplicationCredentials);
  if (googleApplicationCredentials) {
    admin.initializeApp({ credential: admin.credential.cert(googleApplicationCredentials) });
    return;
  }

  throw new Error('No Firebase credentials found');
}

if (!getApps().length) init();

export const db = admin.firestore();
