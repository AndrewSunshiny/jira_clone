import { EntityNotFoundError, type FindOneOptions } from 'typeorm';

import { Project, User, Comment, Issue } from '#/entities';
import { generateErrors } from '#/utils/validation';
import { BadUserInputError } from '#/errors';

import { BaseEntity } from 'typeorm';

export type EntityConstructor = typeof Project | typeof User | typeof Issue | typeof Comment;
export type EntityInstance = Project | User | Issue | Comment;

export const entities: { [key: string]: EntityConstructor } = { Project, User, Issue, Comment };

export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  options?: FindOneOptions,
): Promise<InstanceType<T>> => {
  const instance = await Constructor.findOne({
    where: { id },
    ...options,
  });
  if (!instance) throw new EntityNotFoundError(Constructor, id);
  return instance;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ('validations' in Constructor) {
    const errorFields = generateErrors(instance, Constructor.validations);

    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }

  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = (Constructor as typeof BaseEntity).create(input);
  return validateAndSaveEntity(instance as InstanceType<T>);
};

export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};

export const deleteEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  await instance.remove();
  return instance;
};
