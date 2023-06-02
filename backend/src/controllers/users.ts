import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../types/user';
import User from '../models/user';
import { generateToken } from './../middleware/auth';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find({ role: 'user' });
    res.status(200).json({ users });
  } catch (err) {
    let error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body?.role ?? 'user',
    });
    const newUser: IUser = await user.save();
    res.status(201).json({ message: 'User added', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Error to create user!' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error('No user found');
    res.status(200).json({ user });
  } catch (err) {
    let error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('No user found');
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) throw new Error('Password is not correct');
    const token = await generateToken({ _id: user._id?.toString(), name: user.name });
    res.status(200).json({ user, token });
  } catch (err) {
    let error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateUser: IUser | null = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: 'User updated', user: updateUser });
  } catch (error) {
    res.status(400).json({ message: 'Error to update user!' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'User deleted', user: deletedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error to delete user!' });
  }
};
