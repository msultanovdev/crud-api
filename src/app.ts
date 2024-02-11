import { IncomingMessage, ServerResponse } from 'http';
const { routes } = require('./routes/userRoutes');

const app = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;

  if (url && routes[url]) {
    routes[url](req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
};

export default app;