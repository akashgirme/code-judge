import * as bcrypt from 'bcrypt';

export const hashToken = async (token: string) => {
  const salt = await bcrypt.genSalt();
  const hashedToken = await bcrypt.hash(token, salt);
  return hashedToken;
};
