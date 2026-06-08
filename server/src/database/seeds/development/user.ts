import { faker } from '@faker-js/faker';

import type User from '@/entities/User';

const generateUser = (data: Partial<User> = {}): Partial<User> => ({
  name: faker.company.name(),
  email: faker.internet.email(),
  ...data,
});

export default generateUser;
