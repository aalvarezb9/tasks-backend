"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCollection = exports.tasksCollection = void 0;
const firebase_1 = require("../../../config/firebase");
exports.tasksCollection = firebase_1.db.collection('tasks');
exports.usersCollection = firebase_1.db.collection('users');
