import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import { respond, toUrl } from './util';

const mimeTypes: Record<string, string> =
{
  '': 'text/plain',
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

export const staticRequestListener = (req: http.IncomingMessage, res: http.ServerResponse, root = 'static') =>
{
  const filePath = `${root}${toUrl(req).pathname}`;
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return false;

  respond(res, 200, fs.createReadStream(filePath), mimeTypes[path.extname(filePath)]);
  return true;
};
