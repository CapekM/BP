import 'reflect-metadata';
import * as path from 'path';
import * as ejwt from 'express-jwt';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

import { AppRoutes } from './routes';
import { createBasicUsers } from './utils';

require('dotenv-safe').config({
  path: path.resolve(__dirname, '../.env'),
  sample: path.resolve(__dirname, '../.example.env'),
});

createConnection()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(ejwt({ secret: process.env.JWT_SECRET || '' }).unless({ path: ['/login'] }));

    await createBasicUsers();

    AppRoutes.forEach(route => {
      app[route.method](route.path, (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch(err => next(err));
      });
    });

    app.listen((process.env.LISTEN_ON && +process.env.LISTEN_ON) || 8080);
    console.log(`> Ready on http://${process.env.LISTEN_ON}`);
  })
  .catch(error => console.log('TypeORM connection error: ', error));
