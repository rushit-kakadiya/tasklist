import { AxiosResponse } from 'axios';
import { axiosAPI } from './axios';

export const getTodos = async () => {
  try {
    const todos = await axiosAPI('get', `/todo/all`, {}, true);
    return todos;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const getFilterTodos = async (status: string) => {
  try {
    const todos = await axiosAPI('get', `/todo/${status}`, {}, true);
    return todos;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const addTodo = async (formData: ITodo) => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: true,
    };
    const saveTodo = await axiosAPI('post', '/todo/add', todo, true);
    return saveTodo;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const updateTodo = async (todo: ITodo) => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: !todo.status,
    };
    const updatedTodo: AxiosResponse = await axiosAPI('put', `/todo/edit/${todo._id}`, todoUpdate, true);
    return updatedTodo;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const deleteTodo = async (_id: string) => {
  try {
    const deletedTodo: AxiosResponse = await axiosAPI('delete', `/todo/delete/${_id}`, {}, true);
    return deletedTodo;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};
