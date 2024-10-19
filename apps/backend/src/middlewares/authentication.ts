import Hapi from '@hapi/hapi';
import jwt from 'jsonwebtoken';

export const validateAuth = (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return h.response({ error: 'Unauthorized' }).code(401).takeover();
  }

  const token = authorization.split(' ')[1];

  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
  } catch (err) {
    return h.response({ error: 'Invalid token' }).code(401).takeover();
  }

  return h.continue;
};