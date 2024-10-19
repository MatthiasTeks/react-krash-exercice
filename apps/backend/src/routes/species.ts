import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';
import { enrichEntityData, fetchFromSWAPI } from '../services/swapiService';

const speciesRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/species',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      try {
        const species = await fetchFromSWAPI('species/');
        return h.response(species).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to fetch species' }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/species/{id}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const species = await fetchFromSWAPI(`species/${id}`);
        const enrichedSpecies = await enrichEntityData(species);
        return h.response(enrichedSpecies).code(200);
      } catch (error) {
        return h.response({ error: 'Species not found' }).code(404);
      }
    }
  },
  {
    method: 'GET',
    path: '/species/search/{name}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { name } = request.params;
      try {
        const searchData = await fetchFromSWAPI(`species/?search=${name}`);
        if (!searchData.results || searchData.results.length === 0) {
          return h.response({ error: 'No species matching this name' }).code(404);
        }

        const species = searchData.results[0];
        const enrichedSpecies = await enrichEntityData(species);
        return h.response(enrichedSpecies).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to search species' }).code(500);
      }
    }
  }
];

export default speciesRoutes;