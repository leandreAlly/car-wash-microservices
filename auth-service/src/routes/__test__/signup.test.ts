import request from 'supertest';
import { app } from '../../app';

const sendEmailMock = jest.fn(
  (sendToEmail: string, subject: string, HTMLText: string) => {
    console.log('email sent...');
  }
);

jest.mock('../../services/sendEmail', () => ({
  __esModule: true,
  default: sendEmailMock,
}));

it('returns a 400 with invalid name', async () => {
  return request(app)
    .post('/api/v1/auth/register')
    .send({
      name: '',
      email: 'myemail@gmail.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'myemail',
      password: 'password',
    })
    .expect(400);
});

it('return a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'myemail@gmail.com',
      password: 'pass',
    })
    .expect(400);
});

it('Should not allow password length greater than 16', async () => {
  return request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'myemail@gmail.com',
      password: 'passwordpasswordpasswordpassword',
    })
    .expect(400);
});

it('return a 201 on successful signup', async () => {
  return request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'myemail@gmail.com',
      password: 'password',
    })
    .expect(201);
});

it('Should not allow duplicate email', async () => {
  await request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'myemail@gmail.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'myemail@gmail.com',
      password: 'password',
    })
    .expect(409);
});

it('Should send an email with otp', async () => {
  const response = await request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'myname',
      email: 'hellootp@gmail.com',
      password: 'password',
    })
    .expect(201);

  expect(response.body.otp).toBeDefined();
  expect(typeof response.body.otp).toBe('string');
});
