import * as jwt from 'jsonwebtoken';
import { User } from './entity/User';
import { getRepository } from 'typeorm';

export const getUser = async (token: string): Promise<User> => {
  const decoded = jwt.decode(token) as { [key: string]: any };
  const res = await getRepository(User).findOne(decoded.id);
  if (!res) {
    throw new Error('Cannot find a user');
  }
  return res;
};

function createUser(username: string, email: string, password: string): User {
  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  return user;
}

export async function createBasicUsers(): Promise<void> {
  const res = await getRepository(User).find({
    where: {
      username: 'Aman',
    },
  });
  if (!res.length) {
    await getRepository(User).save(createUser('Aman', 'a@man.cz', '1234'));
    await getRepository(User).save(createUser('Batman', 'batman@example.com', '1234'));
  }
}
