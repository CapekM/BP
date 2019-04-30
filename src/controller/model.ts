import {Request, Response} from "express";

export async function postModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
    }
    response.send('TODO');
}

export async function putModel(request: Request, response: Response) {
    response.send('TODO');
}

export async function deleteModel(request: Request, response: Response) {
    if (!('modelID' in request.params)) {
        response.status(400);
    }
    response.send('TODO');
}
