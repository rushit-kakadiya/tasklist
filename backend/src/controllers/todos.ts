import { Response, Request } from 'express';
import { ITodo } from '../types/todo';
import Todo from '../models/todo';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    let todos: ITodo[],
      user_id = req.token._id;

    if (['true', 'false'].includes(req.params.status)) {
      let status = req.params.status === 'true' || false;
      todos = await Todo.find({ user_id, status });
    } else {
      todos = await Todo.find({ user_id });
    }
    res.status(200).json({ todos });
  } catch (err) {
    let error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo: ITodo = new Todo({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      user_id: req.token._id,
    });
    const newTodo: ITodo = await todo.save();
    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (error) {
    const err = error as Error;
    res.status(401).json({ message: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: 'Todo updated', todo: updateTodo });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Todo deleted', todo: deletedTodo });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
