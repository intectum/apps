import { pageRequestListener } from './page';
import { staticRequestListener } from './static';
import { RequestListener, toFilePath, toUrl } from './util';

export const appRequestListener: RequestListener = async (req, res, secure) =>
{
  const filePath = toFilePath(toUrl(req, secure));

  if (filePath.endsWith('.html'))
  {
    await pageRequestListener(req, res, secure);
  }
  else
  {
    staticRequestListener(req, res, secure);
  }
};
