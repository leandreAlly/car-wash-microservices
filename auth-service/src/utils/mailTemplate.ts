export const verifyEmailTemplate = (userOTP: string) => {
  return `
  <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h1 style="color: #004d99; text-align: center; font-size: 28px; margin-bottom: 20px;">Welcome to Car Wash App!</h1>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);">
      <p style="color: #000; font-size: 18px; text-align: center; margin-bottom: 30px;">Please use the following One-Time Password (OTP) to activate your account:</p>
      <div style="background-color: #004d99; color: #fff; text-align: center; padding: 20px; border-radius: 8px; font-size: 36px; font-weight: bold; margin: 0 auto; width: fit-content;">
        ${userOTP}
      </div>
      <p style="color: #000; font-size: 16px; text-align: center; margin-top: 30px;">Enter this OTP in the required field to verify your email address.</p>
      <p style="color: #000; font-size: 14px; text-align: center;">If you didn't request this OTP, please ignore this email.</p>
    </div>
    <p style="color: #000; font-size: 16px; text-align: center; margin-top: 30px;">Thank you for choosing Car Wash App.</p>
  </div>
</div>
    `;
};
