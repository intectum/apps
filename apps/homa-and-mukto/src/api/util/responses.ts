import { ServerResponse } from 'node:http';
import { respond } from 'apps-web/src/server/util';

export const respondWithJson = <T>(res: ServerResponse, code: number, data: T) =>
{
  respond(res, code, JSON.stringify(data), 'application/json');
};
