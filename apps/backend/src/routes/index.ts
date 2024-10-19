import authRoutes from './auth';
import filmRoutes from './films';
import peopleRoutes from './people';
import planetRoutes from './planet';
import speciesRoutes from './species';
import starshipRoutes from './starship';
import vehicleRoutes from './vehicle';

export default [
  ...authRoutes,
  ...filmRoutes,
  ...peopleRoutes,
  ...planetRoutes,
  ...speciesRoutes,
  ...starshipRoutes,
  ...vehicleRoutes
];