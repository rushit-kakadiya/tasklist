import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import { getTodos, addTodo, updateTodo, deleteTodo, getFilterTodos } from '../API/todo';
import FilterStatus from '../components/FilterStatus';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [formData, setFormData] = useState<ITodo | {}>();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ todos }) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (e: { preventDefault: () => void }, formData: ITodo) => {
    e.preventDefault();
    addTodo(formData)
      .then((res) => {
        fetchTodos();
        setFormData(undefined);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then((res) => {
        fetchTodos();
        setFormData(undefined);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then((res) => fetchTodos())
      .catch((err) => console.log(err));
  };

  const handleFilterTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    getFilterTodos(e.target.value)
      .then(({ todos }) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  return (
    <main className='App'>
      <h1>Todos List</h1>
      <AddTodo saveTodo={handleSaveTodo} formData={formData} setFormData={setFormData} />
      <FilterStatus handleFilterTasks={handleFilterTasks} />
      {todos.map((todo: ITodo) => (
        <TodoItem key={todo._id} updateTodo={handleUpdateTodo} deleteTodo={handleDeleteTodo} todo={todo} />
      ))}
    </main>
  );
};

export default App;
