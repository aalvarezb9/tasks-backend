"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
require("../infrastructure/di/container");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const https_1 = require("firebase-functions/v2/https");
const routes_1 = require("./http/routes");
const ErrorMiddleware_1 = require("./http/middlewares/ErrorMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.router);
app.use(ErrorMiddleware_1.errorMiddleware);
exports.api = (0, https_1.onRequest)({ region: 'us-central1' }, app);
