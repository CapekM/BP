import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Model {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

}
