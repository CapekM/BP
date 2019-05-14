import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Model } from './Model';
import { Project } from './Project';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locatin: string;

  // @Column({ type: 'text', array: true, nullable: true })
  // optionalArrayOfStrings: string[];

  // @Column()
  // scale: number[]; // 3 cisla

  // @Column()
  // rotation: number[]; // 3 cisla

  // @Column()
  // lastTexture: number;

  @ManyToOne(type => Project, project => project.fields, {
    eager: true,
  })
  project: Project;

  @ManyToOne(type => Model, model => model.fields, {
    eager: true,
  })
  model: Model;
}
