import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  process.env.MONGO_URI = mongoUri;

  await mongoose.connect(mongoUri, {}).then(() => {
    console.info('Connected to mongodb for testing.....');
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// global.signin = async () => {
//   const name = 'test';
//   const email = 'test@test.com';
//   const password = 'password';

//   const response = await request(app)
//     .post('/api/v1/auth/register')
//     .send({ email, password, name })
//     .expect(201);

//   await request(app)
//     .post('/api/v1/auth/verify-email')
//     .send({
//       email: email,
//       otp: response.body.otp,
//     })
//     .expect(200);

//   const cookie = response.get('Set-Cookie');

//   return cookie;
// };
