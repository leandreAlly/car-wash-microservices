import request from 'supertest';
import { app } from '../../app';
import { client } from '../../index';

it('returns a 400 with invalid email', async () => {
  return await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'myemail',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'myemail@gmail.com',
      password: 'pass',
    })
    .expect(400);
});

it('return a 401 if the email  is not verified', async () => {
  await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(401);
});

it('returns a 200 on successful login', async () => {
  // Register a new user
  await request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'test',
      email: 'myemail@gmail.com',
      password: 'password',
    })
    .expect(201);

  const otp = '1234';
  await client.set('myemail@gmail.com', otp);

  // Verify the OTP
  await request(app)
    .post('/api/v1/auth/verify-email')
    .send({
      email: 'myemail@gmail.com',
      otp,
    })
    .expect(200);

  // return 400 for wrong OTP
  await request(app)
    .post('/api/v1/auth/verify-email')
    .send({
      email: 'myemail@gmail.com',
      otp: '1235', // wrong OTP
    })
    .expect(400);

  // return 400 when user Login with wrong password
  await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'myemail@gmail.com',
      password: 'passwordx', // wrong password
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'myemail@gmail.com',
      password: 'password',
    })
    .expect(200);
});
