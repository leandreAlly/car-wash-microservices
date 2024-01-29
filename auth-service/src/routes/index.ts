import express from 'express';
import { userRoutes } from './api/user.routes';

const allRoutes = express.Router();

allRoutes.use('/auth', userRoutes);

export default allRoutes;
