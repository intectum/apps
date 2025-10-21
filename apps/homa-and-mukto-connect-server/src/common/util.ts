import { IncomingMessage, ServerResponse } from 'node:http';

import Busboy from 'busboy';

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type'
};

const maxFileSize = 5 * 1024 * 1024; // 5MB

export const getFormBody = <T>(req: IncomingMessage) =>
  new Promise<T>((resolve, reject) =>
  {
    const busboy = Busboy({ headers: req.headers });
    const fields: Record<string, string | Buffer> = {};

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

    busboy.on('file', (name, file) =>
    {
      file.on('error', reject);
      file.on('data', (data: Buffer) =>
      {
        if (!fields[name])
        {
          fields[name] = Buffer.alloc(0);
        }

        if (fields[name].length + data.length > maxFileSize)
        {
          file.destroy(new Error('File size exceeded'));
          return;
        }

        fields[name] = Buffer.concat([ fields[name] as Buffer, data ]);
      });
    });

    busboy.on('finish', async () => resolve(fields as T));

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

export const respondWithCode = (res: ServerResponse, code: number) =>
{
  res.writeHead(code, corsHeaders);
  res.end();
};

export const respondWithJson = <T>(res: ServerResponse, code: number, data: T) =>
{
  res.writeHead(code, { 'content-type': 'application/json', ...corsHeaders });
  res.end(JSON.stringify(data));
};
