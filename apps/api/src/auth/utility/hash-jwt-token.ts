import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.ENCRYPT_DECRYPT_SECRET_KEY;
const INITIALIZATION_VECTOR = crypto.randomBytes(16);

export function encrypt(token: string): string {
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY),
    INITIALIZATION_VECTOR
  );
  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${INITIALIZATION_VECTOR.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(encryptedToken: string): string {
  const textParts = encryptedToken.split(':');
  const initializationVector = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY),
    initializationVector
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
