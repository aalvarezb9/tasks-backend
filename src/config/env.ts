import { config } from 'dotenv';
config();

export const env = {
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  google: {
    credentials: require(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? ''),
  },
};
