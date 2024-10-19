import Hapi from '@hapi/hapi';
import jwt from 'jsonwebtoken';
import { validateAuth } from '../middlewares/authentication';

const authRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload as { username: string, password: string };

      if (username === 'Luke' && password === 'DadSucks') {
        const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
        return h.response({ token }).code(200);
      }

      return h.response({ error: 'Unauthorized' }).code(401);
    }
  },
  {
    method: 'GET',
    path: '/',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: (request, h) => {
      return 'Hello World!';
    }
  },
  {
    method: 'GET',
    path: '/verify-token',
    handler: (request, h) => {
      const token = request.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return h.response({ valid: false, message: 'No token provided' }).code(401);
      }
  
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        return h.response({ valid: true, decoded }).code(200);
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return h.response({ valid: false, message: 'Token expired' }).code(401);
        } else if (error instanceof jwt.JsonWebTokenError) {
          return h.response({ valid: false, message: 'Token invalid' }).code(401);
        } else {
          console.error('Unexpected error during token verification', error);
          return h.response({ valid: false, message: 'Unexpected error' }).code(500);
        }
      }
    }
  }
];

export default authRoutes;