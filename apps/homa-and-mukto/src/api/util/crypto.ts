import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

const algorithm = 'aes-256-gcm';
const keyLength = 32;
const keyTimeout = 24 * 60 * 60 * 1000; // 1 day

export const encryptKey = (userId: string) => encrypt(`${userId}|${Date.now()}`);

export const decryptKey = (key: string) =>
{
  const [ id, timestampString ] = decrypt(key).split('|');
  const timestamp = Number(timestampString);

  if (isNaN(timestamp) || Date.now() > timestamp + keyTimeout) throw new Error('Invalid or expired timestamp');

  return id;
};

export const encrypt = (text: string) =>
{
  if (!process.env.CRYPTO_SECRET) throw new Error('Secret not found');

  // Derive key from password (PBKDF2)
  const salt = randomBytes(16);
  const key = createHash('sha256')
    .update(process.env.CRYPTO_SECRET)
    .update(salt)
    .digest()
    .slice(0, keyLength);

  const iv = randomBytes(12);
  const cipher = createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([ salt, iv, tag, encrypted ]).toString('hex');
};

export const decrypt = (encryptedHex: string) =>
{
  if (!process.env.CRYPTO_SECRET) throw new Error('Secret not found');

  const data = Buffer.from(encryptedHex, 'hex');

  if (data.length < 16 + 12 + 16)
  {
    throw new Error('Invalid encrypted data');
  }

  const salt = data.slice(0, 16);
  const iv = data.slice(16, 16 + 12);
  const tag = data.slice(16 + 12, 16 + 12 + 16);
  const encrypted = data.slice(16 + 12 + 16);

  const key = createHash('sha256')
    .update(process.env.CRYPTO_SECRET)
    .update(salt)
    .digest()
    .slice(0, keyLength);

  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);

  try
  {
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);
    return decrypted.toString('utf8');
  }
  catch
  {
    throw new Error('Decryption failed: wrong password or corrupted data');
  }
};
