import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserAttrs } from '../utils/type';
import { ConflictRequestError, asyncWrapper } from 'error-ease';
import { PasswordUtil } from '../services/password';

const registerUser = asyncWrapper(
  async (req: Request<{}, {}, UserAttrs>, res: Response) => {
    const { email, name } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      throw new ConflictRequestError('This user is already exist');

    const hashedPassword = await PasswordUtil.toHash(req.body.password);

    const user = User.build({ email, name, password: hashedPassword });

    await user.save();

    res
      .status(201)
      .json({ message: 'user registered successfuly', data: user });
  }
);

export { registerUser };
