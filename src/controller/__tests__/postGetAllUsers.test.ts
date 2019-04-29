import "reflect-metadata";
import axios from 'axios';
import { createConnection, Connection } from 'typeorm';
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";

import { createBasicUsers } from "../../entity/User";
import { AppRoutes } from '../../routes';
import { appendFile } from "fs";


let connection: Connection;
let server;
beforeAll ( async () => {
    const result = await createConnection().catch(error => console.log("TypeORM connection error: ", error));

    if (!result) {
        throw new Error('Connection not created');
    }
    connection = result;

    const app = express();
    app.use(bodyParser.json());

    await createBasicUsers();

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    server = app.listen((process.env.LISTEN_ON && +process.env.LISTEN_ON) || 8080);
});

afterAll ( async () => {
    server.close();
    await connection.close();
});

test('It should response the GET method', async () => {
    await axios({
        method:'get',
        url:'http://localhost:4000/users',
      })
    .then( response => {
        expect(response.status).toBe(200);
    })
    .catch( error => {
        throw error;
    });
});
