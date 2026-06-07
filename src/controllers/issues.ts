import { Router } from 'express';

import Issue from '@/entities/Issue';
import { catchErrors } from '@/errors';
import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from '@/utils/typeorm';
import { ensureString } from '@/utils/common';
import { BadUserInputError } from '@/errors';

const router = Router();

router.get(
  '/issue/:issueId',
  catchErrors(async (req, res) => {
    const issueId = ensureString(req.params.issueId);
    if (!issueId) throw new BadUserInputError({ issueId: 'Issue ID is required.' });

    const issue = await findEntityOrThrow(Issue, issueId);
    res.respond({ issue });
  }),
);

router.post(
  '/issues',
  catchErrors(async (req, res) => {
    const issue = await createEntity(Issue, req.body);
    res.respond({ issue });
  }),
);

router.put(
  '/issue/:issueId',
  catchErrors(async (req, res) => {
    const issueId = ensureString(req.params.issueId);
    if (!issueId) throw new BadUserInputError({ issueId: 'Issue ID is required.' });

    const issue = await updateEntity(Issue, issueId, req.body);
    res.respond({ issue });
  }),
);

router.delete(
  '/issue/:issueId',
  catchErrors(async (req, res) => {
    const issueId = ensureString(req.params.issueId);
    if (!issueId) throw new BadUserInputError({ issueId: 'Issue ID is required.' });

    const issue = await deleteEntity(Issue, issueId);
    res.respond({ issue });
  }),
);

export default router;
