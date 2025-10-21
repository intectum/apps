import { TokenCamelCase } from 'homa-and-mukto-connect-core';

export const getToken = () => JSON.parse(localStorage.getItem('token') ?? '{}') as TokenCamelCase;

export const getUser = () => getToken().user;
