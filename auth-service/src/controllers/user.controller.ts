import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserAttrs } from '../utils/type';
import {
  BadRequestError,
  ConflictRequestError,
  asyncWrapper,
} from 'error-ease';
import { PasswordUtil } from '../services/password';
import otpGenerator from 'otp-generator';
import { client } from '../index';

const registerUser = asyncWrapper(
  async (req: Request<{}, {}, UserAttrs>, res: Response) => {
    const { email, name } = req.body;

    const otp = otpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      throw new ConflictRequestError('This user is already exist');

    const hashedPassword = await PasswordUtil.toHash(req.body.password);

    const user = User.build({ email, name, password: hashedPassword });

    client.set(email, otp, {
      EX: 60 * 5, // 5 minutes
      NX: true, // only set the key if it does not already exist
    });

    await user.save();

    res
      .status(201)
      .json({ message: 'user registered successfuly', data: user, otp: otp });
  }
);

const verifyOtp = asyncWrapper(
  async (
    req: Request<{}, {}, { email: string; otp: string }>,
    res: Response
  ) => {
    const { email, otp } = req.body;

    const storedOTP = await client.get(email);

    if (storedOTP !== otp) {
      throw new BadRequestError('Invalid OTP');
    }

    client.del(email);
    await User.findOneAndUpdate({ email }, { isVerified: true });

    res.status(200).json({ message: 'User verified successfully' });
  }
);

export { registerUser, verifyOtp };
