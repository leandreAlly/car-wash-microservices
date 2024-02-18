import request from 'supertest';
import { app } from '../../app';
import sendEmail from '../../services/sendEmail';

const sendEmailMock = jest.fn(
  (sendToEmail: string, subject: string, HTMLText: string) => {
    console.log('email sent...');
  }
);

jest.mock('../../services/sendEmail', () => ({
  __esModule: true,
  default: sendEmailMock,
}));

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/v1/auth/register')
    .send({
      email: 'myemail',
      password: 'password',
    })
    .expect(400);
});
