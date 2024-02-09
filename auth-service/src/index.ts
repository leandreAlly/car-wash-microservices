import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const REDISPORT = 6379;

export const client = createClient({
  url: 'redis://redis-service:6379',
});

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST must be defined');
  }
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY must be defined');
  }
  if (!process.env.SEND_GRID_EMAIL) {
    throw new Error('SEND_GRID_EMAIL must be defined');
  }

  client.on('error', (err) => console.error(err));
  client.on('connect', () => console.log('connected to redis'));
  await client.connect();

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log(`Listening on Port: 3000.......`);
  });
};

startServer();
