import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import { respond, toFilePath, toUrl } from './util';

const mimeTypes: Record<string, string> =
{
  '': 'text/plain',
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

export type StaticRequestListener = (req: http.IncomingMessage, res: http.ServerResponse, secure: boolean, root?: string) => void | Promise<void>;

export const staticRequestListener: StaticRequestListener = (req, res, secure, root = 'static') =>
{
  const filePath = `${root}${toFilePath(toUrl(req, secure))}`;
  if (!fs.existsSync(filePath))
  {
    respond(res, 404);
    return;
  }

  respond(res, 200, fs.createReadStream(filePath), mimeTypes[path.extname(filePath)]);
};
