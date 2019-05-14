import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Model } from './Model';
import { Texture } from './Texture';

@Entity()
export class Mesh {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  triangles: number;

  @ManyToOne(type => Model, model => model.fields, {
    eager: true,
  })
  model: Model;

  @OneToMany(type => Texture, texture => texture.mesh)
  textures: Texture[];

  // @Column()
  // defaultTexture: number;
}
