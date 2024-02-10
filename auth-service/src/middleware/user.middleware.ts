import { NotAuthorizedError, asyncWrapper } from 'error-ease';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

export const checkIfUserIsVerified = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user?.isVerified) {
      throw new NotAuthorizedError('Please verify your email first.');
    }

    next();
  }
);
