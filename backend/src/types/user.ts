import { Document } from 'mongoose';

export enum RoleType {
  admin = 'admin',
  user = 'user',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: RoleType;
  todo_ids?: Array<string>;
}
