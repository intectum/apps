import http from 'node:http';
import path from 'node:path';

export type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse, secure: boolean) => void | Promise<void>;

export const toUrl = (req: http.IncomingMessage, secure: boolean) => new URL(req.url ?? '', `http${secure ? 's' : ''}://${req.headers.host}`);

export const toFilePath = (url: URL) =>
{
  if (url.pathname.startsWith('/.well-known')) return url.pathname; // TODO temp fix

  let filePath = `${url.pathname === '/' ? '/index' : url.pathname}`;
  if (!path.extname(url.pathname)) filePath += '.html';

  return filePath;
};
