import express from 'express';
import { NotFoundError, asyncWrapper, errorHandler } from 'error-ease';
import cookieSession from 'cookie-session';
import allRoutes from './routes';

const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use('/api/v1', allRoutes);

app.use(
  '*',
  asyncWrapper(async (req, res, next) => {
    next(new NotFoundError());
  })
);

app.use(errorHandler);

export { app };
