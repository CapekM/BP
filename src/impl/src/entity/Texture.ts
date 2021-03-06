import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Mesh } from './Mesh';

export enum weatherType {
  rainy = 'Rainy',
  sunny = 'Sunny',
  cloudy = 'Cloudy',
}

@Entity()
export class Texture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({
    default: weatherType.sunny,
  })
  weather: string;

  @ManyToOne(type => Mesh, mesh => mesh.textures)
  mesh: Mesh;
}
