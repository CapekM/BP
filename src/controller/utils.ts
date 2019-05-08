import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const getUser = async (token: string): Promise<User> => {
    const decoded = jwt.decode(token) as {[key: string]: any};
    return getRepository(User).findOne(decoded.id);
}