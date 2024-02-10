import * as argon2 from 'argon2';

export class PasswordUtil {
  static async toHash(password: string): Promise<string> {
    return argon2.hash(password);
  }
  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    return argon2.verify(storedPassword, suppliedPassword);
  }
}
