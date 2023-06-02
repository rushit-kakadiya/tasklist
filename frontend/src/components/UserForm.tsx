import React, { FC, useState } from 'react';

type Props = {
  isLoginType: boolean;
  submitData: (e: React.FormEvent, formData: ITodo | any) => void;
};

const User: FC<Props> = ({ submitData, isLoginType }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  return (
    <form className='Form' onSubmit={(e) => submitData(e, formData)}>
      <div>
        {!isLoginType ? (
          <div>
            <label htmlFor='name'>Name</label>
            <input onChange={handleForm} type='text' id='name' />
          </div>
        ) : null}
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleForm} type='text' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleForm} type='password' id='password' />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Submit</button>
    </form>
  );
};

export default User;
