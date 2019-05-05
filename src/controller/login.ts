import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import {Request, Response} from "express";

import { User } from '../entity/User';

export async function login(request: Request, response: Response) {
    if (!request.body.username || !request.body.password) {
        response.status(401).send('Login failed wrong user credentials')
    }

    const user = await getRepository(User).find({
        where: {
            username: request.body.username,
        }
    });

    if( user.length && user[0].password !== request.body.password ) {
        response.status(401).send('Login failed wrong password')
    }

    response.send(jwt.sign({username: user[0].username}, process.env.JWT_SECRET, { expiresIn: '1h' }));
}
