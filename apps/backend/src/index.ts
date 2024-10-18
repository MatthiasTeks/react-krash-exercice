'use strict';

import Hapi, { Server } from '@hapi/hapi';

const init = async (): Promise<void> => {
  const server: Server = Hapi.server({
    port: 4242,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: '/',
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