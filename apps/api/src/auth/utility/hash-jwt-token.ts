import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.ENCRYPT_DECRYPT_SECRET_KEY ?? 'Secret-key';

// Ensure SECRET_KEY is exactly 32 bytes long
const KEY = crypto
  .createHash('sha256')
  .update(String(SECRET_KEY))
  .digest('base64')
  .slice(0, 32);

export function encrypt(token: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedToken: string): string {
  const [ivHex, encryptedText] = encryptedToken.split(':');
  if (!ivHex || !encryptedText) {
    throw new Error('Invalid encrypted token format');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
