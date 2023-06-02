import { Router } from 'express';
import todo from './todo';
import user from './user';

const router: Router = Router();

router.use('/todo', todo);
router.use('/user', user);

export default router;
