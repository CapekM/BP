import "reflect-metadata";
import axios from 'axios';
import { createConnection, Connection } from 'typeorm';
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";

import { AppRoutes } from '../../routes';
import { createBasicUsers } from "../user";

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

describe('Model', () => {
    let id: number;
    it('PUT should response 200', async () => {
        await axios({
            method:'put',
            url:'http://localhost:4000/model',
            data: {
                key: 'SomeKey',
            }
        })
        .then( response => {
            expect(response.data).toHaveProperty('id');
            id = response.data.id;
            expect(response.status).toBe(200);
        })
        .catch( error => {
            throw error;
        });
    });
    it('POST should response 200', async () => {
        await axios({
            method:'post',
            url:`http://localhost:4000/model/${id}`,
        })
        .then( response => {
            expect(response.status).toBe(200);
        })
        .catch( error => {
            throw error;
        });
    });
    it('POST should response 400', async () => {
        await axios({
            method:'post',
            url:'http://localhost:4000/model/',
        })
        .then( () => {
            throw new Error('Axios should return Error');
        })
        .catch( error => {
            expect(error.response.status).toBe(404);
        });
    });
    it('DELETE should response 200', async () => {
        await axios({
            method:'delete',
            url:`http://localhost:4000/model/${id}`,
        })
        .then( response => {
            expect(response.status).toBe(200);
        })
        .catch( error => {
            throw error;
        });
    });
});

describe('Users', () => {
    it('should response 200', async () => {
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
});

describe('Login', () => {
    it('should response 200', async () => {
        await axios({
            method:'post',
            url:'http://localhost:4000/login',
            data: {
                username: 'Fred',
                password: 'kamen'
            }
        })
        .then( response => {
            expect(response.status).toBe(200);
        })
        .catch( error => {
            throw error;
        });
    });

    it('should response 401', async () => {
        await axios({
            method:'post',
            url:'http://localhost:4000/login',
        })
        .then( () => {
            throw new Error('Axios should return Error');
        })
        .catch( error => {
            expect(error.response.status).toBe(401);
        });
    });
});