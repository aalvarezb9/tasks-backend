import { config } from 'dotenv';
config();

export const env = {
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret'
};
