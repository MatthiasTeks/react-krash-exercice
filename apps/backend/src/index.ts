'use strict';

import Hapi, { Server } from '@hapi/hapi';
import { validateAuth } from './middlewares/authentication';

const init = async (): Promise<void> => {
  const server: Server = Hapi.server({
    port: 4242,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: '/',
    options: {
      pre: [{method: validateAuth}]
    },
    handler: (request, h) => {
      return 'Hello World!';
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();