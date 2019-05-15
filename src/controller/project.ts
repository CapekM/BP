import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';

export async function putProject(request: Request, response: Response) {
  if (!request.body.name) {
    response.status(400);
    throw new Error();
  }
  const project = new Project();
  project.name = request.body.name;
  const result = await getRepository(Project).save(project);
  response.send(result);
}

export async function postProject(request: Request, response: Response) {
  const project = await getRepository(Project).findOne(request.params.ProjectID);
  if (!project) {
    response.status(404);
    throw new Error();
  }

  if (request.body.name) {
    project.name = request.body.name;
  }
  await getRepository(Project).save(project);
  response.send(Project);
}

export async function getProject(request: Request, response: Response) {
  const entity = await getRepository(Project).findOne(request.params.ProjectID);
  if (!entity) {
    response.status(404);
    throw new Error();
  }
  response.send(entity);
}

export async function deleteProject(request: Request, response: Response) {
  const entity = await getRepository(Project).findOne(request.params.ProjectID);
  if (!entity) {
    response.status(404);
    throw new Error();
  }

  await getRepository(Project).remove(entity);
  response.send('OK');
}
