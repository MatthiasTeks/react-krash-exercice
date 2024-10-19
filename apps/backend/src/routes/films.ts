import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';
import { enrichEntityData, fetchFromSWAPI } from '../services/swapiService';

const filmRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/films',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      try {
        const { page = 1 } = request.query;

        const films = await fetchFromSWAPI(`films/?page=${page}`);

        return h.response(films).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to fetch films' }).code(500);
      }
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
      try {
        const film = await fetchFromSWAPI(`films/${id}`);
        const enrichedFilm = await enrichEntityData(film);
        return h.response(enrichedFilm).code(200);
      } catch (error) {
        return h.response({ error: 'Film not found' }).code(404);
      }
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
      try {
        const searchData = await fetchFromSWAPI(`films/?search=${title}`);
        if (!searchData.results || searchData.results.length === 0) {
          return h.response({ error: 'No film matching this title' }).code(404);
        }

        const film = searchData.results[0];
        const enrichedFilm = await enrichEntityData(film);
        return h.response(enrichedFilm).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to search film' }).code(500);
      }
    }
  }
];

export default filmRoutes;