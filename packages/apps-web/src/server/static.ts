import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import { toFilePath, toUrl } from './util';

const mimeTypes: Record<string, string> =
{
  '': 'text/plain',
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

export type StaticRequestListener = (req: http.IncomingMessage, res: http.ServerResponse, secure: boolean, root?: string) => void | Promise<void>;

export const staticRequestListener: StaticRequestListener = (req, res, secure, root = 'static') =>
{
  const filePath = `${root}${toFilePath(toUrl(req, secure))}`;

  const mimeType = mimeTypes[path.extname(filePath)];
  if (!mimeType) throw new Error(`Mime type not found for extension ${path.extname(filePath)}`);

  if (!fs.existsSync(filePath))
  {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': mimeType });
  fs.createReadStream(filePath).pipe(res);
};
