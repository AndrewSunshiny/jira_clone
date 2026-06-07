import { sample, times } from 'lodash';

import generateUser from './user';
import generateProject from './project';
import generateIssue from './issue';
import generateComment from './comment';
import { Comment, Issue, Project, User } from '@/entities';
import { createEntity } from '@/utils/typeorm';
import createDatabaseConnection from '@/database/connection';

const seedUsers = (): Promise<User[]> => {
  const users = times(4, () => createEntity(User, generateUser()));
  return Promise.all(users);
};

const seedProjects = (users: User[]): Promise<Project[]> => {
  const projects = times(2, () => createEntity(Project, generateProject({ users })));
  return Promise.all(projects);
};

const seedIssues = (projects: Project[]): Promise<Issue[]> => {
  const issues = projects
    .map((project) =>
      times(10, () =>
        createEntity(
          Issue,
          generateIssue({
            reporterId: sample(project.users)?.id,
            project,
            users: [sample(project.users) as User],
          }),
        ),
      ),
    )
    .flat();

  return Promise.all(issues);
};

const seedComments = (issues: Issue[]): Promise<Comment[]> => {
  const comment = issues.map((issue) =>
    createEntity(Comment, generateComment({ issue, user: sample(issue.project.users) })),
  );
  return Promise.all(comment);
};

const seedEntities = async (): Promise<void> => {
  const users = await seedUsers();
  const projects = await seedProjects(users);
  const issues = await seedIssues(projects);
  await seedComments(issues);
};

const initializeSeed = async (): Promise<void> => {
  try {
    const Connection = await createDatabaseConnection();
    await Connection.dropDatabase();
    await Connection.synchronize();
    await seedEntities();
    console.log('Seeding completed!');
  } catch (error) {
    console.log(error);
  }
};

initializeSeed();
