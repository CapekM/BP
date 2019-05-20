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
  if (request.body.location) {
    field.location1 = request.body.location.x;
    field.location2 = request.body.location.y;
    field.location3 = request.body.location.z;
  }
  if (request.body.size) {
    field.size1 = request.body.size.x;
    field.size2 = request.body.size.y;
    field.size3 = request.body.size.z;
  }
  if (request.body.rotation) {
    field.rotation1 = request.body.rotation.x;
    field.rotation2 = request.body.rotation.y;
    field.rotation3 = request.body.rotation.z;
  }
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
    field.location1 = request.body.location.x;
    field.location2 = request.body.location.y;
    field.location3 = request.body.location.z;
  }
  if (request.body.size) {
    field.size1 = request.body.size.x;
    field.size2 = request.body.size.y;
    field.size3 = request.body.size.z;
  }
  if (request.body.rotation) {
    field.rotation1 = request.body.rotation.x;
    field.rotation2 = request.body.rotation.y;
    field.rotation3 = request.body.rotation.z;
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
  response.send({
    id: entity.id,
    location: {
      x: entity.location1,
      y: entity.location2,
      z: entity.location3,
    },
    size: {
      x: entity.size1,
      y: entity.size2,
      z: entity.size3,
    },
    rotation: {
      x: entity.rotation1,
      y: entity.rotation2,
      z: entity.rotation3,
    },
    model: entity.model,
    project: entity.project.id,
  });
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
