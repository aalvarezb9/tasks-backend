"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
function init() {
    firebase_admin_1.default.initializeApp();
}
if (!(0, app_1.getApps)().length)
    init();
exports.db = firebase_admin_1.default.firestore();
