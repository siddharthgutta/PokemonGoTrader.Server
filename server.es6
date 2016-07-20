import express from 'express';
import http from 'http';
import TestRouter from './routes/test.es6';

const app = express();
const server = http.createServer(app);

// Sets up specific routes
app.use('/', TestRouter);

export default server;
