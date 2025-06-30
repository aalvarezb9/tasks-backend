"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const creds = require('../../../keys/tasks-collection-82ded-firebase-adminsdk-fbsvc-50d50660f0.json');
if (!(0, app_1.getApps)().length)
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(creds),
    });
exports.db = firebase_admin_1.default.firestore();
