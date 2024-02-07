import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserAttrs } from '../utils/type';
import { ConflictRequestError, asyncWrapper } from 'error-ease';
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

    client.set(email, otp);

    await user.save();

    res
      .status(201)
      .json({ message: 'user registered successfuly', data: user, otp: otp });
  }
);

export { registerUser };
