import 'reflect-metadata';
import axios from 'axios';
import { Server } from 'http';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as ejwt from 'express-jwt';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, Connection } from 'typeorm';

import { AppRoutes } from '../../routes';
import { createBasicUsers } from '../../utils';

let connection: Connection;
let server: Server;
let token: string;
const secret = process.env.JWT_SECRET || '';

beforeAll(async () => {
  const result = await createConnection().catch(error =>
    console.log('TypeORM connection error: ', error),
  );

  if (!result) {
    throw new Error('Connection not created');
  }
  connection = result;

  const app = express();
  app.use(bodyParser.json());
  app.use(ejwt({ secret }).unless({ path: ['/login'] }));

  await createBasicUsers();

  AppRoutes.forEach(route => {
    app[route.method](route.path, (request: Request, response: Response, next: Function) => {
      route
        .action(request, response)
        .then(() => next)
        .catch(err => next(err));
    });
  });

  server = app.listen((process.env.LISTEN_ON && +process.env.LISTEN_ON) || 8080);
});

afterAll(async () => {
  // await getRepository(Project).clear();
  server.close();
  await connection.close();
});
it('should response with 200', async () => {
  await axios({
    method: 'post',
    url: 'http://localhost:4000/login',
    data: {
      username: 'Batman',
      password: '1234',
    },
  })
    .then(response => {
      token = response.data;
      expect(typeof jwt.verify(token, secret)).toBe('object');
      expect(response.status).toBe(200);
    })
    .catch(error => {
      throw error;
    });
});
describe('Login', () => {
  it('should response with 200', async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/login',
      data: {
        username: 'Batman',
        password: '1234',
      },
    })
      .then(response => {
        token = response.data;
        expect(typeof jwt.verify(token, secret)).toBe('object');
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });

  it('should response with 401', async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/login',
      data: {
        username: 'Batman',
        password: '',
      },
    })
      .then(() => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });

  it('should response with 401', async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/login',
    })
      .then(() => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });
});

describe('Model', () => {
  let id: number;
  const testKey = 'SomeKey';

  it('PUT should response with 400', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/model',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(400);
      });
  });
  it('PUT should response with 200', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/model',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        key: testKey,
        description: 'This is my model!',
      },
    })
      .then(response => {
        expect(response.data).toHaveProperty('id');
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('PUT should response with 200', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/model',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        key: testKey,
      },
    })
      .then(response => {
        expect(response.data).toHaveProperty('id');
        id = response.data.id;
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('POST should response with 200', async () => {
    await axios({
      method: 'post',
      url: `http://localhost:4000/model/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        key: testKey,
        description: 'POST',
      },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('POST should response with 404', async () => {
    await axios({
      method: 'post',
      url: `http://localhost:4000/model/${id + 1}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
  it('GET should response with 200', async () => {
    await axios({
      method: 'get',
      url: `http://localhost:4000/model/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.data.id).toBe(id);
        expect(response.data.key).toBe(testKey);
        expect(response.data.description).toBe('POST');
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('DELETE should response with 200', async () => {
    await axios({
      method: 'delete',
      url: `http://localhost:4000/model/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('GET should response with 404', async () => {
    await axios({
      method: 'get',
      url: `http://localhost:4000/model/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
  it('DELETE should response with 404', async () => {
    await axios({
      method: 'delete',
      url: `http://localhost:4000/model/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
});

describe('Project', () => {
  let id: number;
  const testName = 'TestName';

  it('PUT should response with 400', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/project',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(400);
      });
  });
  it('PUT should response with 200', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/project',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: 'smth',
      },
    })
      .then(response => {
        expect(response.data).toHaveProperty('id');
        id = response.data.id;
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('POST should response with 200', async () => {
    await axios({
      method: 'post',
      url: `http://localhost:4000/project/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: testName,
      },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('POST should response with 404', async () => {
    await axios({
      method: 'post',
      url: `http://localhost:4000/project/${id + 1}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
  it('GET should response with 200', async () => {
    await axios({
      method: 'get',
      url: `http://localhost:4000/project/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.data.id).toBe(id);
        expect(response.data.name).toBe(testName);
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('DELETE should response with 200', async () => {
    await axios({
      method: 'delete',
      url: `http://localhost:4000/project/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('GET should response with 404', async () => {
    await axios({
      method: 'get',
      url: `http://localhost:4000/project/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
  it('DELETE should response with 404', async () => {
    await axios({
      method: 'delete',
      url: `http://localhost:4000/project/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
});

describe('Field', () => {
  let project: number;
  let model: number;
  let id: number;
  const testLocation = 'TestLocation';
  beforeAll(async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/project',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: 'testField',
      },
    })
      .then(response => {
        project = response.data.id;
      })
      .catch(error => {
        throw error;
      });
    await axios({
      method: 'put',
      url: 'http://localhost:4000/model',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        key: 'testField',
      },
    })
      .then(response => {
        model = response.data.id;
      })
      .catch(error => {
        throw error;
      });
  });

  it('PUT should response with 400', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/field',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(400);
      });
  });
  it('PUT should response with 200', async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:4000/field',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        location: 'to rewrite',
        model,
        project,
      },
    })
      .then(response => {
        expect(response.data).toHaveProperty('id');
        id = response.data.id;
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('POST should response with 200', async () => {
    await axios({
      method: 'post',
      url: `http://localhost:4000/field/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        location: testLocation,
      },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('POST should response with 404', async () => {
    await axios({
      method: 'post',
      url: `http://localhost:4000/field/${id + 1}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
  it('GET should response with 200', async () => {
    await axios({
      method: 'get',
      url: `http://localhost:4000/field/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.data.id).toBe(id);
        expect(response.data.location).toBe(testLocation);
        expect(response.data.project.id).toBe(project);
        expect(response.data.model.id).toBe(model);
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('DELETE should response with 200', async () => {
    await axios({
      method: 'delete',
      url: `http://localhost:4000/field/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
  it('GET should response with 404', async () => {
    await axios({
      method: 'get',
      url: `http://localhost:4000/field/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
  it('DELETE should response with 404', async () => {
    await axios({
      method: 'delete',
      url: `http://localhost:4000/field/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        throw new Error('Axios should return Error');
      })
      .catch(error => {
        expect(error.response.status).toBe(404);
      });
  });
});

describe('Users', () => {
  it('should response with 200', async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:4000/users',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(error => {
        throw error;
      });
  });
});
