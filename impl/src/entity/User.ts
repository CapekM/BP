import {Entity, PrimaryGeneratedColumn, Column, getRepository} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

}


function createUser(username: string, email: string, password: string): User {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    return user;
}

export async function createBasicUsers(): Promise<void> {
    const users = await getRepository(User).find();
    users.forEach((user) => {
        if (user.username === "Aman" || "Batman") {
            getRepository(User).delete(user.id);
        }
    });
    await getRepository(User).save(createUser("Aman", "a@man.cz", "1234"));
    await getRepository(User).save(createUser("Batman", "batman@example.com", "1234"));
}
