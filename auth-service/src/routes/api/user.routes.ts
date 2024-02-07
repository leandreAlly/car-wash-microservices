import express from 'express';
import { registerUser, verifyOtp } from '../../controllers/user.controller';
import { validate } from '../../services/validation';
import { userRegisterSchema } from '../../utils/validationSchemas';

const router = express.Router();

router.post('/register', validate(userRegisterSchema), registerUser);
router.post('/verify-email', verifyOtp);
export { router as userRoutes };
