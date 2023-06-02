import React, { useState, useEffect } from 'react';
import UserItem from '../components/UsersList';
import { deleteUser, getUsers } from '../API/users';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = (): void => {
    getUsers()
      .then(({ users }) => setUsers(users))
      .catch((err: Error) => console.log(err));
  };

  const handleDeleteUser = (_id: string): void => {
    deleteUser(_id)
      .then((res) => fetchUsers())
      .catch((err) => console.log(err));
  };

  return (
    <main className='App'>
      <h1>Users list</h1>
      {users.map((user: IUser) => (
        <UserItem key={user._id} deleteUser={handleDeleteUser} user={user} />
      ))}
    </main>
  );
};

export default Admin;
