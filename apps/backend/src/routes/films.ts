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
  },
  {
    method: 'GET',
    path: '/films/{id}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { id } = request.params;
      const response = await fetch(`${process.env.SW_API}/films/${id}`);
      if (!response.ok) {
        return h.response({ error: 'Film not found' }).code(404);
      }
      const film = await response.json();
      return film;
    }
  },
  {
    method: 'GET',
    path: '/films/search/{title}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { title } = request.params;
      const response = await fetch(`${process.env.SW_API}/films/?search=${title}`);
      if (!response.ok) {
        return h.response({ error: 'Film not found' }).code(404);
      }
      const film = await response.json();
      return film;
    }
  }
];

export default filmRoutes;