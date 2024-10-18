import Hapi from '@hapi/hapi';

export const validateAuth = (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const authorization = request.headers.authorization;

    if(!authorization) {
        return h.response({error: 'Unauthorized'}).code(401).takeover();
    }

    const base64Credentials = authorization.split(' ')[1];
    const credentials =  Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if(username === 'Luke' && password === 'DadSucks') {
        return h.continue;
    }

    return h.response({error: 'Unauthorized'}).code(401).takeover();
}