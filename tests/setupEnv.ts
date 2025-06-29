import 'reflect-metadata';

process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
