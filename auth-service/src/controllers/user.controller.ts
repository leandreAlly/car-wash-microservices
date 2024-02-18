import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserAttrs, UserOtp } from '../utils/type';
import {
  BadRequestError,
  ConflictRequestError,
  asyncWrapper,
} from 'error-ease';
import { PasswordUtil } from '../services/password';
import otpGenerator from 'otp-generator';
import { client } from '../index';
import sendEmail from '../services/sendEmail';
import { verifyEmailTemplate } from '../utils/mailTemplate';
import { JWTUtil } from '../services/jwt';

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

    const verificationEmail = verifyEmailTemplate(otp);

    sendEmail(email, 'Car Wash email verification', verificationEmail);

    req.session = { otp };

    res
      .status(201)
      .json({ message: 'user registered successfuly', data: user, otp: otp });
  }
);

const signInUser = asyncWrapper(
  async (req: Request<{}, {}, UserAttrs>, res: Response) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const isPasswordMatch = await PasswordUtil.compare(
      existUser.password,
      password
    );

    if (!isPasswordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const token = await JWTUtil.generateToken({ id: existUser.id, email });

    req.session = { jwt: token };

    return res.status(200).json({
      message: 'User logged in successfully',
      data: {
        user: existUser,
      },
      token,
    });
  }
);

const verifyOtp = asyncWrapper(
  async (req: Request<{}, {}, UserOtp>, res: Response) => {
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

export { registerUser, verifyOtp, signInUser };
