import express from 'express';
import { registerUser } from '../../controllers/user.controller';
import { validate } from '../../services/validation';
import { userRegisterSchema } from '../../utils/validationSchemas';

const router = express.Router();

router.post('/register', validate(userRegisterSchema), registerUser);

export { router as userRoutes };
