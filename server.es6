import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import TestRouter from './routes/test.es6';
import {FbRouter} from './routes/fb-messenger.es6';
import './api/controllers/dispatcher.es6';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sets up specific routes
app.use('/', TestRouter);
app.use('/fb-messenger', FbRouter);

export default server;
