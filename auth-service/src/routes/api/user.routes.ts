import express from 'express';
import {
  registerUser,
  signInUser,
  verifyOtp,
} from '../../controllers/user.controller';
import { validate } from '../../services/validation';
import {
  userOtpSchema,
  userRegisterSchema,
  userSignInSchema,
} from '../../utils/validationSchemas';
import { checkIfUserIsVerified } from '../../middleware/user.middleware';

const router = express.Router();

router.post('/register', validate(userRegisterSchema), registerUser);
router.post('/verify-email', validate(userOtpSchema), verifyOtp);
router.post(
  '/login',
  validate(userSignInSchema),
  checkIfUserIsVerified,
  signInUser
);

export { router as userRoutes };
