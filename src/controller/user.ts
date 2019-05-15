import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export async function getAllUsers(request: Request, response: Response) {
  const users = await getRepository(User).find();

  response.send(users);
}
