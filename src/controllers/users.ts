import { Router } from 'express';

import seedGuestUserEntities from '@/database/seeds/guestUser';
import User from '@/entities/User';
import { catchErrors } from '@/errors';
import { signToken } from '@/utils/authToken';
import { createEntity } from '@/utils/typeorm';

const router = Router();

router.get(
  'users/guest',
  catchErrors(async (req, res) => {
    const user = await createEntity(User, req.body);
    await seedGuestUserEntities(user);
    res.respond({ authToken: signToken({ sub: user.id }) });
  }),
);

export default router;
