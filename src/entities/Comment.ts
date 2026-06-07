// TODO check field's types

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import Issue from './Issue';
import User from './User';
import is, { type FieldValidators } from '@/utils/validation';

@Entity()
class Comment extends BaseEntity {
  static validations: FieldValidators = {
    body: [is.required(), is.maxLength(50000)],
  };

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  body!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  @RelationId((comment: Comment) => comment.user)
  userId!: number;

  @ManyToOne(() => Issue, (issue) => issue.comments)
  issue!: Issue;
}

export default Comment;
