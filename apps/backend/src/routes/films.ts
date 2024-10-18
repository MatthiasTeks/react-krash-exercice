import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';

const filmRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/films',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const response = await fetch(`${process.env.SW_API}/films/`);
      const films = await response.json();
      return films;
    }
  }
];

export default filmRoutes;