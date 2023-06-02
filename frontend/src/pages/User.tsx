import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { addUser, loginUser } from '../API/users';
import { useNavigate } from 'react-router-dom';

const User: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginType, setIsLoginType] = useState(true);

  const handleSubmitUser = async (e: { preventDefault: () => void }, formData: IUser) => {
    e.preventDefault();
    if (isLoginType) {
      try {
        const res = await loginUser(formData);
        localStorage.setItem('token', res.token);
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else if (res.user.role === 'user') {
          navigate('/todo');
        } else {
          throw new Error('Invalid data');
        }
      } catch (err) {
        console.error(err);
      }
      return;
    } else {
      try {
        await addUser(formData);
        setIsLoginType(true);
      } catch (err_1) {
        console.error(err_1);
      }
      return;
    }
  };

  return (
    <main className='App'>
      <h1>User Form</h1>
      <UserForm isLoginType={isLoginType} submitData={handleSubmitUser} />
      <button onClick={() => setIsLoginType(!isLoginType)}>
        {isLoginType ? 'click here to Login' : 'click here to Register'}
      </button>
    </main>
  );
};

export default User;
