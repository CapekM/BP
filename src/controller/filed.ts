import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Field } from '../entity/Field';
import { Project } from '../entity/Project';
import { Model } from '../entity/Model';

export async function putField(request: Request, response: Response) {
  if (!request.body.location || !request.body.model || !request.body.project) {
    response.status(400);
    throw new Error();
  }
  const field = new Field();
  field.location = request.body.location;
  field.project = await getRepository(Project).findOneOrFail(request.body.project);
  field.model = await getRepository(Model).findOneOrFail(request.body.model);
  const result = await getRepository(Field).save(field);
  response.send(result);
}

export async function postField(request: Request, response: Response) {
  const field = await getRepository(Field).findOne(request.params.FieldID);
  if (!field) {
    response.status(404);
    throw new Error();
  }

  if (request.body.location) {
    field.location = request.body.location;
  }
  await getRepository(Field).save(field);
  response.send(field);
}

export async function getField(request: Request, response: Response) {
  const entity = await getRepository(Field).findOne(request.params.FieldID);
  if (!entity) {
    response.status(404);
    throw new Error();
  }
  response.send(entity);
}

export async function deleteField(request: Request, response: Response) {
  const entity = await getRepository(Field).findOne(request.params.FieldID);
  if (!entity) {
    response.status(404);
    throw new Error();
  }

  await getRepository(Field).remove(entity);
  response.send('OK');
}
