import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';
import { enrichEntityData, fetchFromSWAPI } from '../services/swapiService';

const peopleRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/people',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      try {
        const people = await fetchFromSWAPI('people/');
        return h.response(people).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to fetch people' }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/people/{id}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const person = await fetchFromSWAPI(`people/${id}`);
        const enrichedPerson = await enrichEntityData(person);
        return h.response(enrichedPerson).code(200);
      } catch (error) {
        return h.response({ error: 'Person not found' }).code(404);
      }
    }
  },
  {
    method: 'GET',
    path: '/people/search/{name}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { name } = request.params;
      try {
        const searchData = await fetchFromSWAPI(`people/?search=${name}`);
        if (!searchData.results || searchData.results.length === 0) {
          return h.response({ error: 'No person matching this name' }).code(404);
        }

        const person = searchData.results[0];
        const enrichedPerson = await enrichEntityData(person);
        return h.response(enrichedPerson).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to search person' }).code(500);
      }
    }
  },
];

export default peopleRoutes;