import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from '../entity/User';

export async function getAllUsers(request: Request, response: Response) {
    const users = await getRepository(User).find();

    response.send(users);
}

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
        }
    });
    if (!res.length) {
        await getRepository(User).save(createUser("Aman", "a@man.cz", "1234"));
        await getRepository(User).save(createUser("Batman", "batman@example.com", "1234"));
    }
}
