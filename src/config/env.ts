import { config } from 'dotenv';
import functions from 'firebase-functions';
config();

export const env = {
  jwtSecret: process.env?.JWT_SECRET ?? functions?.config()?.jwt?.secret ?? 'dev-secret',
  keyRoute: process.env?.KEYS_ROUTE ?? '',
  environment: process.env?.NODE_ENV ?? process.env?.ENVIRONMENT ?? 'dev'
};
