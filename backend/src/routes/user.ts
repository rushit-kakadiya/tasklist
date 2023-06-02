import { Router } from 'express';
import { getUsers, addUser, updateUser, deleteUser, getUserById, loginUser } from '../controllers/users';
import { auth } from '../middleware/auth';

const router: Router = Router();

router.get('/', auth, getUsers);
router.post('/add', addUser);
router.post('/login', loginUser);
router.put('/edit/:id', auth, updateUser);
router.delete('/delete/:id', auth, deleteUser);
router.get('/:id', auth, getUserById);

export default router;
