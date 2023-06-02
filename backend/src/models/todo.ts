import { ITodo } from './../types/todo';
import { model, Schema } from 'mongoose';

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, versionKey: false },
);

export default model<ITodo>('Todo', todoSchema);
