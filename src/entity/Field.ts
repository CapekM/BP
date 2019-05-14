import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Model } from './Model';
import { Project } from './Project';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locatin: string;

  @ManyToOne(type => Project, project => project.fields, {
    eager: true,
  })
  project: Project;

  @ManyToOne(type => Model, model => model.fields, {
    eager: true,
  })
  model: Model;
}
