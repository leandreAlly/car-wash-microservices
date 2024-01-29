import express from 'express';
import { NotFoundError, errorHandler } from 'error-ease';
import allRoutes from './routes';

const app = express();

app.use(express.json());
app.set('trust proxy', true);

app.use('/api/v1', allRoutes);
app.use('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
