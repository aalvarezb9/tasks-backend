import '../infrastructure/di/container';
import express from 'express';
import cors from 'cors';
import { onRequest } from 'firebase-functions/v2/https';
import { router } from './http/routes';
import { errorMiddleware } from './http/middlewares/ErrorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);

export const api = onRequest({ region: 'us-central1' }, app);
