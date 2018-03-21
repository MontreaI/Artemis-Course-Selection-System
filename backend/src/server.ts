import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';

import * as apiController from './controller/api';
const port = process.env.port || 3376;

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: false} ));
app.use(cors());
cors({origin: true});

app.set('port', port);
app.get('/years', apiController.getYears);
app.get('/terms/:year', apiController.getTerms);
app.get('/terms/:year/:term', apiController.getDepartments);

app.get('/', function(req, res, next) {
    global.console.log('got root request');
});

http.createServer(app).listen(port);
console.log('running on port', port);
