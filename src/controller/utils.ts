import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const getUser = async (token: string): Promise<User> => {
  const decoded = jwt.decode(token) as { [key: string]: any };
  const res = await getRepository(User).findOne(decoded.id);
  if (!res) {
    throw new Error('Cannot find a user');
  }
  return res;
};
