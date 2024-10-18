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
  }
];

export default authRoutes;