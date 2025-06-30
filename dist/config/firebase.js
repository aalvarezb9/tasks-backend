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
    if (process.env.FUNCTIONS_EMULATOR !== 'true' && process.env.K_SERVICE) {
        firebase_admin_1.default.initializeApp();
        return;
    }
    const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log('saPath', saPath);
    if (saPath && fs_1.default.existsSync(saPath)) {
        const sa = require(saPath);
        console.log('sa', sa);
        firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(sa) });
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
