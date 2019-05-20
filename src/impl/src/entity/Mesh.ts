import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Model } from './Model';
import { Texture } from './Texture';

@Entity()
export class Mesh {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  triangles: number;

  @Column()
  key: string;

  @ManyToOne(type => Model, model => model.fields)
  model: Model;

  @OneToMany(type => Texture, texture => texture.mesh, {
    eager: true,
  })
  textures: Texture[];
}
