import { User } from 'homa-and-mukto-connect-core';

export const getUser = () => JSON.parse(localStorage.getItem('user') ?? '{}') as User;
