"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const fs_1 = __importDefault(require("fs"));
function init() {
    // En Cloud Functions, usar credenciales por defecto
    const functionsEmulator = process.env.FUNCTIONS_EMULATOR;
    const kService = process.env.K_SERVICE;
    console.log('functionsEmulator', functionsEmulator);
    console.log('kService', kService);
    // Si estamos en Cloud Functions (producción), usar credenciales por defecto
    if (functionsEmulator !== 'true' && (kService || process.env.FUNCTION_NAME)) {
        firebase_admin_1.default.initializeApp();
        return;
    }
    // Para desarrollo local, buscar archivo de credenciales
    const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log('saPath', saPath);
    if (saPath && fs_1.default.existsSync(saPath)) {
        firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(require(saPath)) });
        return;
    }
    // Fallback para variables de entorno
    const saJson = process.env.SA_JSON;
    console.log('saJson', saJson);
    console.log('saJson', saJson ? 'provided' : 'undefined');
    if (saJson) {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(JSON.parse(saJson))
        });
        return;
    }
    // Si nada funciona, intentar inicialización por defecto
    try {
        firebase_admin_1.default.initializeApp();
        console.log('Initialized with default credentials');
    }
    catch (error) {
        throw new Error('No Firebase credentials found');
    }
}
if (!(0, app_1.getApps)().length)
    init();
exports.db = firebase_admin_1.default.firestore();
