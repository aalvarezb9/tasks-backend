import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import fs from 'fs';

function init() {
  const functionsEmulator = process.env.FUNCTIONS_EMULATOR;
  const kService = process.env.K_SERVICE;
  
  if (functionsEmulator !== 'true' && (kService || process.env.FUNCTION_NAME)) {
    admin.initializeApp();
    return;
  }

  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (saPath && fs.existsSync(saPath)) {
    admin.initializeApp({ credential: admin.credential.cert(require(saPath)) });
    return;
  }

  const saJson = process.env.SA_JSON;
  if (saJson) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(saJson))
    });
    return;
  }

  try {
    admin.initializeApp();
    console.log('Initialized with default credentials');
  } catch (error) {
    throw new Error('No Firebase credentials found');
  }
}

if (!getApps().length) init();

export const db = admin.firestore();