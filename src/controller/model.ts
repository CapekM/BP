import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { Model } from '../entity/Model';

export async function postModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
    }
    const entity = await getRepository(Model).findOne(request.params.modelID);
    if (! entity) {
        response.status(404);
    }
    response.send(entity);
}

export async function putModel(request: Request, response: Response) {
    if (!request.body.key) {
        response.status(400);
    }
    const entity = new Model();
    entity.key = request.body.key;
    const result = await getRepository(Model).save(entity)
    response.send(result);
}

export async function deleteModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
    }
    const entity = await getRepository(Model).findOne(request.params.modelID);
    if (! entity) {
        response.status(404);
    }
    await getRepository(Model).remove(entity);
    response.send('OK');
}
