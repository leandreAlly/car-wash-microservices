import Jwt from 'jsonwebtoken';
import { UserAttrs } from '../utils/type';

interface TokenData {
  id: string;
  email: string;
}

export class JWTUtil {
  static async generateToken(
    data: TokenData,
    options: any = {}
  ): Promise<string> {
    return Jwt.sign({ data }, process.env.JWT_SECRET!, options);
  }

  static async verifyToken(token: string) {
    return Jwt.verify(token, process.env.JWT_SECRET!);
  }
}
