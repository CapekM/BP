import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Field } from './Field';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Field, field => field.project)
  fields: Field[];
}
