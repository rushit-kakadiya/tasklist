import React from 'react';

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
  setFormData: (value: React.SetStateAction<{} | ITodo | undefined>) => void;
  formData: any;
};

const AddTodo: React.FC<Props> = ({ saveTodo, formData, setFormData }) => {
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
