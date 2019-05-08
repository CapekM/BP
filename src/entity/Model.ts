import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

import { ModelPermission } from './ModelPermission';

@Entity()
export class Model {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;
    
    @OneToMany(type => ModelPermission, modelPermission => modelPermission.model)
    modelPermissions: ModelPermission[];
}
