import { AxiosResponse } from 'axios';
import { axiosAPI } from './axios';

export const getUsers = async () => {
  try {
    const users = await axiosAPI('get', `/user`, {}, true);
    return users;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const getUserDetail = async (id: string) => {
  try {
    const user = await axiosAPI('get', `/user/${id}`, {}, true);
    return user;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const addUser = async (formData: IUser) => {
  try {
    const user: Omit<IUser, '_id'> = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    const saveUser = await axiosAPI('post', '/user/add', user);
    return saveUser;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const loginUser = async (formData: IUser) => {
  try {
    const user: Omit<IUser, '_id' | 'name'> = {
      email: formData.email,
      password: formData.password,
    };
    const saveUser = await axiosAPI('post', '/user/login', user);
    return saveUser;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const updateUser = async (user: IUser) => {
  try {
    const userUpdate: Pick<IUser, 'name' | 'password'> = {
      name: user.name,
      password: user.password,
    };
    const updatedUser: AxiosResponse = await axiosAPI('put', `/user/edit/${user._id}`, userUpdate, true);
    return updatedUser;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};

export const deleteUser = async (_id: string) => {
  try {
    const deletedUser: AxiosResponse = await axiosAPI('delete', `/user/delete/${_id}`, {}, true);
    return deletedUser;
  } catch (err) {
    let error = err as Error;
    throw new Error(error.message);
  }
};
