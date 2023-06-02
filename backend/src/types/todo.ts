import { Document } from 'mongoose';

export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
  user_id?: string;
}
