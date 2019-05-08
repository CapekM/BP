import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { Model } from '../entity/Model';
import { getUser } from './utils';
import { ModelPermission, permissionType } from '../entity/ModelPermission';


export async function postModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
        throw new Error;
    }
    const model = await getRepository(Model).findOne(request.params.modelID);
    if (!model) {
        response.status(404);
        throw new Error;
    }
    const perm = await getRepository(ModelPermission).find({
        where: {
            user: await getUser(request.headers.authorization.split(" ")[1]),
            model
        }
    });
    if (!perm.length || perm[0].type !== permissionType.all) {
        response.status(403);
        throw new Error;
    }
    console.log('updating model');
    
    response.send(model);
}

export async function putModel(request: Request, response: Response) {
    if (!request.body.key) {
        response.status(400);
        throw new Error;
    }
    const model = new Model();
    model.key = request.body.key;

    const result = await getRepository(Model).save(model);

    const modelPermission = new ModelPermission();
    modelPermission.model = result;
    modelPermission.user = await getUser(request.headers.authorization.split(" ")[1]);
    await getRepository(ModelPermission).save(modelPermission)

    response.send(result);
}

export async function deleteModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
        throw new Error;
    }
    const entity = await getRepository(Model).findOne(request.params.modelID);
    if (! entity) {
        response.status(404);
        throw new Error;
    }

    await getRepository(ModelPermission).delete({
            model: entity
    });
    await getRepository(Model).remove(entity);
    response.send('OK');
}

export async function getModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
        throw new Error;
    }
    const entity = await getRepository(Model).findOne(request.params.modelID);
    if (! entity) {
        response.status(404);
        throw new Error;
    }
    response.send(entity);
}
