import Hapi from '@hapi/hapi';
import { validateAuth } from '../middlewares/authentication';
import { enrichEntityData, fetchFromSWAPI } from '../services/swapiService';

const vehicleRoutes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/vehicles',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      try {
        const vehicles = await fetchFromSWAPI('vehicles/');
        return h.response(vehicles).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to fetch vehicles' }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/vehicles/{id}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const vehicle = await fetchFromSWAPI(`vehicles/${id}`);
        const enrichedVehicle = await enrichEntityData(vehicle);
        return h.response(enrichedVehicle).code(200);
      } catch (error) {
        return h.response({ error: 'Vehicle not found' }).code(404);
      }
    }
  },
  {
    method: 'GET',
    path: '/vehicles/search/{name}',
    options: {
      pre: [{ method: validateAuth }]
    },
    handler: async (request, h) => {
      const { name } = request.params;
      try {
        const searchData = await fetchFromSWAPI(`vehicles/?search=${name}`);
        if (!searchData.results || searchData.results.length === 0) {
          return h.response({ error: 'No vehicle matching this name' }).code(404);
        }

        const vehicle = searchData.results[0];
        const enrichedVehicle = await enrichEntityData(vehicle);
        return h.response(enrichedVehicle).code(200);
      } catch (error) {
        return h.response({ error: 'Failed to search vehicle' }).code(500);
      }
    }
  },
];

export default vehicleRoutes;