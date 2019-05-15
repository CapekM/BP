import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Model } from '../entity/Model';

export async function postModel(request: Request, response: Response) {
  const model = await getRepository(Model).findOne(request.params.modelID);
  if (!model) {
    response.status(404);
    throw new Error();
  }

  if (request.body.key) {
    model.key = request.body.key;
  }
  if (request.body.description) {
    model.description = request.body.description;
  }
  await getRepository(Model).save(model);
  response.send(model);
}

export async function putModel(request: Request, response: Response) {
  if (!request.body.key) {
    response.status(400);
    throw new Error();
  }
  const model = new Model();
  model.key = request.body.key;
  model.description = request.body.description ? request.body.description : '';
  const result = await getRepository(Model).save(model);

  response.send(result);
}

export async function deleteModel(request: Request, response: Response) {
  const entity = await getRepository(Model).findOne(request.params.modelID);
  if (!entity) {
    response.status(404);
    throw new Error();
  }

  await getRepository(Model).remove(entity);
  response.send('OK');
}

export async function getModel(request: Request, response: Response) {
  const entity = await getRepository(Model).findOne(request.params.modelID);
  if (!entity) {
    response.status(404);
    throw new Error();
  }
  response.send(entity);
}
