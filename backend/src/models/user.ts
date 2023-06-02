import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { IUser, RoleType } from '../types/user';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 8);
  }
  next();
});

export default model<IUser>('User', userSchema);
