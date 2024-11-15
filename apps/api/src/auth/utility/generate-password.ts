import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export const generatePassword = (length = 16) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let tempPassword = '';
  const values = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    tempPassword += charset[values[i] % charset.length];
  }

  return tempPassword;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
