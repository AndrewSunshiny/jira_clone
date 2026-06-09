// TODO check field's types

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Comment from './Comment';
import Issue from './Issue';
import Project from './Project';
import is, { type FieldValidators } from '#/utils/validation';

@Entity()
class User extends BaseEntity {
  static validations: FieldValidators = {
    name: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
  };

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  email!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @ManyToMany(() => Issue, (issue) => issue.users)
  issues!: Issue[];

  @ManyToMany(() => Project, (project) => project.users)
  projects!: Project[];
}

export default User;
