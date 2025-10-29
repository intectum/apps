import { TokenCamelCase } from '../../types';
import { getToken } from './data';

export const apiFetch = async (input: string | URL | Request, init?: RequestInit) =>
{
  try
  {
    if (typeof(input) === 'string')
    {
      input = `/api${input}`;
    }

    if (!init) init = {};
    if (!init.headers) init.headers = {};

    const token = getToken();
    const searchParams = new URLSearchParams(location.search);
    (init.headers as Record<string, string>).Authorization = `Bearer ${token?.accessToken ?? searchParams.get('key')}`;

    const response = await fetch(input, init);

    if (response.status === 401 && token?.refreshTokenExpiresAt && new Date(token.refreshTokenExpiresAt).getTime() > new Date().getTime())
    {
      const refreshResponse = await fetch('/api/oauth/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: 'homa-and-mukto-app',
          client_secret: 'secret', // TODO
          refresh_token: token.refreshToken ?? ''
        })
      });

      if (refreshResponse.ok)
      {
        const refreshToken = await refreshResponse.json() as TokenCamelCase;
        localStorage.setItem('token', JSON.stringify(refreshToken));

        (init.headers as Record<string, string>).Authorization = `Bearer ${refreshToken.accessToken}`;
        return fetch(input, init);
      }
    }

    return response;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any)
  {
    return {
      ok: false,
      statusText: err.message
    } as Response;
  }
};
