import authRoutes from './auth';
import filmRoutes from './films';

export default [
  ...authRoutes,
  ...filmRoutes
];