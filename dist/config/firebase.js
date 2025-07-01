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
    const firebaseConfig = process.env.FIREBASE_CONFIG;
    console.log('firebaseConfig', firebaseConfig);
    if (firebaseConfig) {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(JSON.parse(firebaseConfig))
        });
        return;
    }
    const functionsEmulator = process.env.FUNCTIONS_EMULATOR;
    const kService = process.env.K_SERVICE;
    if (functionsEmulator !== 'true' && kService) {
        firebase_admin_1.default.initializeApp();
        return;
    }
    const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (saPath && fs_1.default.existsSync(saPath)) {
        firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(require(saPath)) });
        return;
    }
    if (process.env.SA_JSON) {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(JSON.parse(process.env.SA_JSON))
        });
        return;
    }
    throw new Error('No Firebase credentials found');
}
if (!(0, app_1.getApps)().length)
    init();
exports.db = firebase_admin_1.default.firestore();
