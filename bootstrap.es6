import config from 'config';

const port = config.get('Server.port');

export function initServer() {
  require('./server.es6').default.listen(port,
    () => console.log(`Deployed on port:${port}`));
}
