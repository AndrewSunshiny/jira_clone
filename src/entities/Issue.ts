// TODO check field's types

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import Comment from './Comment';
import Project from './Project';
import User from './User';
import is, { type FieldValidators } from '@/utils/validation';
import { IssuePriority, IssueStatus, IssueType } from '@/constants/issues.ts';

@Entity()
class Issue extends BaseEntity {
  static validations: FieldValidators = {
    title: [is.required(), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(IssueType))],
    status: [is.required(), is.oneOf(Object.values(IssueStatus))],
    priority: [is.required(), is.oneOf(Object.values(IssuePriority))],
    description: [is.maxLength(100000)],
  };

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  title!: string;

  @Column('varchar')
  type!: IssueType;

  @Column('varchar')
  status!: IssueStatus;

  @Column('varchar')
  priority!: IssuePriority;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @Column({ type: 'integer', nullable: true })
  estimate: number | null = null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column('integer')
  reporterId!: number;

  @ManyToOne(() => Project, (project) => project.issues)
  project!: Project;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments!: Comment[];

  @ManyToMany(() => User, (user) => user.issues)
  @JoinTable()
  users!: User[];

  @RelationId((issue: Issue) => issue.users)
  userIds!: number[];
}

export default Issue;
