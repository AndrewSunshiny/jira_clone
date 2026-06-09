import { Router } from 'express';

import Project from '#/entities/Project';
import { BadUserInputError, catchErrors } from '#/errors';
import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from '#/utils/typeorm';
import { ensureString } from '#/utils/common';

const router = Router();

router.get(
  '/projects',
  catchErrors(async (_req, res) => {
    const projects = await Project.find();
    res.respond({ projects });
  }),
);

router.get(
  '/projects/projectId',
  catchErrors(async (req, res) => {
    const projectId = ensureString(req.params.projectId);
    if (!projectId) throw new BadUserInputError({ projectId: 'Project ID is required.' });

    const project = await findEntityOrThrow(Project, projectId, {
      relations: {
        users: true,
        issues: {
          comments: true,
        },
      },
    });
    res.respond({ project });
  }),
);

router.post(
  '/projects',
  catchErrors(async (req, res) => {
    const project = await createEntity(Project, req.body);
    res.respond({ project });
  }),
);

router.put(
  '/projects/:projectId',
  catchErrors(async (req, res) => {
    const projectId = ensureString(req.params.projectId);
    if (!projectId) throw new BadUserInputError({ projectId: 'Project ID is required.' });

    const project = await updateEntity(Project, projectId, req.body);
    res.respond({ project });
  }),
);

router.delete(
  '/projects/:projectId',
  catchErrors(async (req, res) => {
    const projectId = ensureString(req.params.projectId);
    if (!projectId) throw new BadUserInputError({ projectId: 'Project ID is required.' });

    const project = await deleteEntity(Project, projectId);
    res.respond({ project });
  }),
);

export default router;
