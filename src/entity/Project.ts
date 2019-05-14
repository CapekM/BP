import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Field } from './Field';

@Entity()
export class Project {
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

  @OneToMany(type => Field, field => field.project)
  fields: Field[];
}
