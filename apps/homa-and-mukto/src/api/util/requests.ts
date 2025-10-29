import { IncomingMessage } from 'node:http';

import Busboy from 'busboy';

const maxFileSize = 5 * 1024 * 1024; // 5MB

export const getBody = <T>(req: IncomingMessage) =>
{
  const contentType = req.headers['content-type'];

  if (contentType === 'application/json') return getJsonBody<T>(req);
  if (contentType === 'application/x-www-form-urlencoded') return getURLSearchParamsBody<T>(req);
  if (contentType?.startsWith('multipart/form-data')) return getFormBody<T>(req);

  throw new Error('Invalid content type');
};

export const getFormBody = <T>(req: IncomingMessage) =>
  new Promise<T>((resolve, reject) =>
  {
    const busboy = Busboy({ headers: req.headers });
    const fields: Record<string, string | Buffer> = {};

    busboy.on('error', reject);

    busboy.on('field', (name, value) =>
    {
      try
      {
        fields[name] = JSON.parse(value);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any)
      {
        if (err.name === 'SyntaxError')
        {
          fields[name] = value;
        }
        else
        {
          throw err;
        }
      }
    });

    busboy.on('file', (name, file, info) =>
    {
      let buffer = Buffer.alloc(0);

      file.on('error', reject);
      file.on('data', (data: Buffer) =>
      {
        buffer = Buffer.concat([ buffer, data ]);
        if (buffer.length > maxFileSize)
        {
          file.destroy(new Error('File size exceeded'));
        }
      });
      file.on('end', async () =>
      {
        fields[`${name}-buffer`] = buffer;
        fields[`${name}-filename`] = info.filename;
      });
    });

    busboy.on('finish', () => resolve(fields as T));

    req.pipe(busboy);
  });

export const getJsonBody = <T>(req: IncomingMessage) =>
  new Promise<T>((resolve, reject) =>
  {
    let body = '';
    req.on('error', reject);
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(JSON.parse(body) as T));
  });

export const getURLSearchParamsBody = <T>(req: IncomingMessage) =>
  new Promise<T>((resolve, reject) =>
  {
    const chunks: Uint8Array[] = [];
    req.on('error', reject);
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () =>
    {
      const urlSearchParams = new URLSearchParams(Buffer.concat(chunks).toString('utf8'));

      const body: Record<string, string> = {};
      urlSearchParams.forEach((value, key) => body[key] = value);

      resolve(body as T);
    });
  });
