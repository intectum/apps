import { ServerResponse } from 'node:http';

const corsHeaders = {
  /*'Access-Control-Allow-Origin': '*', TODO
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type'*/
};

export const respondWithCode = (res: ServerResponse, code: number) =>
{
  res.writeHead(code, corsHeaders);
  res.end();
};

export const respondWithJson = <T>(res: ServerResponse, code: number, data: T) =>
{
  res.writeHead(code, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(JSON.stringify(data));
};
