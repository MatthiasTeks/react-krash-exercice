import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';
import { enrichEntityData, fetchFromSWAPI } from '../services/swapiService';

const starshipRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/starships',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      try {
        const starships = await fetchFromSWAPI('starships/');
        return h.response(starships).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to fetch starships' }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/starships/{id}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const starship = await fetchFromSWAPI(`starships/${id}`);
        const enrichedStarship = await enrichEntityData(starship);
        return h.response(enrichedStarship).code(200);
      } catch (error) {
        return h.response({ error: 'Starship not found' }).code(404);
      }
    }
  },
  {
    method: 'GET',
    path: '/starships/search/{name}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { name } = request.params;
      try {
        const searchData = await fetchFromSWAPI(`starships/?search=${name}`);
        if (!searchData.results || searchData.results.length === 0) {
          return h.response({ error: 'No starship matching this name' }).code(404);
        }

        const starship = searchData.results[0];
        const enrichedStarship = await enrichEntityData(starship);
        return h.response(enrichedStarship).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to search starship' }).code(500);
      }
    }
  }
];

export default starshipRoutes;