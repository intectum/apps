import http from 'node:http';
import stream from 'node:stream';
import zlib from 'node:zlib';

export const toUrl = (req: http.IncomingMessage, secure?: boolean) => new URL(req.url ?? '', `http${secure ? 's' : ''}://${req.headers.host}`);

export const respond = (res: http.ServerResponse, code: number, data?: stream.Stream | string, contentType?: string, headers?: Record<string, string>) =>
{
  if (!headers) headers = {};
  if (data) headers['Content-Encoding'] = 'gzip';
  if (contentType) headers['Content-Type'] = contentType;

  res.writeHead(code, headers);

  if (data)
  {
    if (typeof(data) === 'string')
    {
      zlib.gzip(Buffer.from(data, 'utf-8'), (error, result) => res.end(result));
    }
    else
    {
      data.pipe(zlib.createGzip()).pipe(res);
    }
  }
  else
  {
    res.end();
  }
};
