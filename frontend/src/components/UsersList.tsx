import React from 'react';

type Props = UserProps & {
  deleteUser: (_id: string) => void;
};

const Users: React.FC<Props> = ({ user, deleteUser }) => {
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1>{user.name}</h1>
        <span>{user.email}</span>
      </div>
      <div className='Card--button'>
        <button onClick={() => deleteUser(user._id)} className='Card--button__delete'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Users;
