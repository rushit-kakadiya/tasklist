import { Router } from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { auth } from '../middleware/auth';
const router: Router = Router();

router.post('/add', auth, addTodo);
router.put('/edit/:id', auth, updateTodo);
router.delete('/delete/:id', auth, deleteTodo);
router.get('/:status', auth, getTodos);

export default router;
