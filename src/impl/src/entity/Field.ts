import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Model } from './Model';
import { Project } from './Project';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float',
    default: 0,
  })
  location1: number;

  @Column({
    type: 'float',
    default: 0,
  })
  location2: number;

  @Column({
    type: 'float',
    default: 0,
  })
  location3: number;

  @Column({
    type: 'float',
    default: 0,
  })
  size1: number;

  @Column({
    type: 'float',
    default: 0,
  })
  size2: number;

  @Column({
    type: 'float',
    default: 0,
  })
  size3: number;

  @Column({
    type: 'float',
    default: 0,
  })
  rotation1: number;

  @Column({
    type: 'float',
    default: 0,
  })
  rotation2: number;

  @Column({
    type: 'float',
    default: 0,
  })
  rotation3: number;

  @ManyToOne(type => Project, project => project.fields, {
    eager: true,
  })
  project: Project;

  @ManyToOne(type => Model, model => model.fields, {
    eager: true,
  })
  model: Model;
}
