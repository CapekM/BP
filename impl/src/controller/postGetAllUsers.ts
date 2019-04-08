import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from '../entity/User';

export async function postGetAllUsers(request: Request, response: Response) {

    const postRepository = getManager().getRepository(User);

    const users = await postRepository.find();

    response.send(users);
}