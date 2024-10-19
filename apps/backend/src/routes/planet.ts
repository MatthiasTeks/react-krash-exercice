import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';
import { enrichEntityData, fetchFromSWAPI } from '../services/swapiService';

const planetRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/planets',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      try {
        const planets = await fetchFromSWAPI('planets/');
        return h.response(planets).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to fetch planets' }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/planets/{id}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const planet = await fetchFromSWAPI(`planets/${id}`);
        const enrichedPlanet = await enrichEntityData(planet);
        return h.response(enrichedPlanet).code(200);
      } catch (error) {
        return h.response({ error: 'Planet not found' }).code(404);
      }
    }
  },
  {
    method: 'GET',
    path: '/planets/search/{name}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { name } = request.params;
      try {
        const searchData = await fetchFromSWAPI(`planets/?search=${name}`);
        if (!searchData.results || searchData.results.length === 0) {
          return h.response({ error: 'No planet matching this name' }).code(404);
        }

        const planet = searchData.results[0];
        const enrichedPlanet = await enrichEntityData(planet);
        return h.response(enrichedPlanet).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to search planet' }).code(500);
      }
    }
  }
];

export default planetRoutes;