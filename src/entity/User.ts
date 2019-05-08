import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

import { ModelPermission } from "./ModelPermission";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    username: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;
    
    @OneToMany(type => ModelPermission, modelPermission => modelPermission.user)
    modelPermissions: ModelPermission[];
}
