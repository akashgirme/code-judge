import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export const generateOtp = (length = 6) => {
  let otp = '';
  while (otp.length < length) {
    const randomByte = crypto.randomBytes(1).readUInt8(0);
    if (randomByte < 250) {
      otp += (randomByte % 10).toString();
    }
  }
  return otp;
};

export const hashOtp = async (otp: string) => {
  const salt = await bcrypt.genSalt();
  const hashedOtp = await bcrypt.hash(otp, salt);
  return hashedOtp;
};
