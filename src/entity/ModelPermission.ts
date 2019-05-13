import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './User';
import { Model } from './Model';

export enum permissionType {
  all = 'ALL',
  read = 'READ',
  none = 'NONE',
}

@Entity()
export class ModelPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: permissionType.all,
  })
  type: permissionType;

  @ManyToOne(type => User, user => user.modelPermissions, {
    eager: true,
  })
  user: User;

  @ManyToOne(type => Model, model => model.modelPermissions, {
    eager: true,
  })
  model: Model;
}
