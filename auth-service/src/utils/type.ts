export type UserAttrs = {
  name: string;
  email: string;
  password: string;
  role?: string;
  isVerified?: boolean;
};

export type UserOtp = {
  email: string;
  otp: string;
};
