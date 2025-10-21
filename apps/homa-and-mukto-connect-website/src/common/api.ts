import { getToken } from './data';

export const apiFetch = async (input: string | URL | Request, init?: RequestInit) =>
{
  if (typeof(input) === 'string')
  {
    input = `http://localhost:8000${input}`;
  }

  if (!init) init = {};
  if (!init.headers) init.headers = {};
  (init.headers as Record<string, string>).authorization = `Bearer ${getToken()?.accessToken}`;

  return fetch(input, init);
};

export const apiFetchJson = async <T>(input: string | URL | Request, init?: RequestInit) =>
{
  const response = await apiFetch(input, init);
  return await response.json() as T;
};
