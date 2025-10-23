import { TokenCamelCase } from 'homa-and-mukto-core';

export const passwordRegex = '^(?=.*[A-Za-z])(?=.*\\d).{8,}$';

export const instagramRegex = '^[^@].*$';
export const phoneRegex = '^\\+[0-9 ]*$';

export const getToken = () =>
{
  const tokenJson = localStorage.getItem('token');
  if (!tokenJson) return undefined;

  return JSON.parse(tokenJson) as TokenCamelCase;
};
