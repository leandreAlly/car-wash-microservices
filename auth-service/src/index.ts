import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const PORT: string | number = process.env.PORT || 8080;

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb');
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}.......`);
  });
};

startServer();
