import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import fs from 'fs';

function init() {
  // En Cloud Functions, usar credenciales por defecto
  const functionsEmulator = process.env.FUNCTIONS_EMULATOR;
  const kService = process.env.K_SERVICE;
  console.log('functionsEmulator', functionsEmulator);
  console.log('kService', kService);
  
  // Si estamos en Cloud Functions (producción), usar credenciales por defecto
  if (functionsEmulator !== 'true' && (kService || process.env.FUNCTION_NAME)) {
    admin.initializeApp();
    return;
  }

  // Para desarrollo local, buscar archivo de credenciales
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  console.log('saPath', saPath);
  if (saPath && fs.existsSync(saPath)) {
    admin.initializeApp({ credential: admin.credential.cert(require(saPath)) });
    return;
  }

  // Fallback para variables de entorno
  const saJson = process.env.SA_JSON;
  console.log('saJson', saJson);
  console.log('saJson', saJson ? 'provided' : 'undefined');
  if (saJson) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(saJson))
    });
    return;
  }

  // Si nada funciona, intentar inicialización por defecto
  try {
    admin.initializeApp();
    console.log('Initialized with default credentials');
  } catch (error) {
    throw new Error('No Firebase credentials found');
  }
}

if (!getApps().length) init();

export const db = admin.firestore();