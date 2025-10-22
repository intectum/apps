import { TokenCamelCase } from 'homa-and-mukto-connect-core';

export const getToken = () =>
{
  const tokenJson = localStorage.getItem('token');
  if (!tokenJson) return undefined;

  return JSON.parse(tokenJson) as TokenCamelCase;
};
