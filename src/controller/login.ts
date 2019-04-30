import {Request, Response} from "express";

export async function login(request: Request, response: Response) {
    if (!request.body.username || !request.body.password) {
        response.status(401).send('Login failed wrong user credentials')
    }

    response.send('TODO tokdn');
}