import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Field } from './Field';
import { Mesh } from './Mesh';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  description: string;

  @OneToMany(type => Field, field => field.model)
  fields: Field[];

  @OneToMany(type => Mesh, mesh => mesh.model, {
    eager: true,
  })
  meshes: Mesh[];
}
