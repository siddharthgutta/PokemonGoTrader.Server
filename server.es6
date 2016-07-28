import express from 'express';
import http from 'http';
import TestRouter from './routes/test.es6';
import {FbRouter} from './routes/fb-messenger.es6';

const app = express();
const server = http.createServer(app);

// Sets up specific routes
app.use('/', TestRouter);
app.use('/fb-messenger', FbRouter);

export default server;
