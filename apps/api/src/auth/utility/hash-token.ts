import * as bcrypt from 'bcrypt';

export const hashToken = async (token: string) => {
  const salt = await bcrypt.genSalt();
  const hashedToken = await bcrypt.hash(token, salt);
  return hashedToken;
};

export const compareToken = async (
  receivedRefreshToken: string,
  hashRefreshToken: string
) => {
  const match = await bcrypt.compare(receivedRefreshToken, hashRefreshToken);
  return match;
};
