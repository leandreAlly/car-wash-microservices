import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import { checkEnvVar } from './utils/checkEnvVar';

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';
const mongoUri = process.env.MONGO_URI;

export const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

const startServer = async () => {
  if (process.env.NODE_ENV !== 'test') {
    checkEnvVar('MONGO_URI');
    checkEnvVar('REDIS_HOST');
    checkEnvVar('JWT_KEY');
    checkEnvVar('SENDGRID_API_KEY');
    checkEnvVar('SEND_GRID_EMAIL');
  }

  try {
    client.on('error', (err) => console.error(err));
    client.on('connect', () => console.log('connected to redis'));
    await client.connect();

    await mongoose.connect(mongoUri!);
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log(`Listening on Port: 3000.......`);
  });
};

startServer();
