import mongoose, { ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const url =
    process.env.MONGO_URL ??
    'mongodb+srv://db_user:hOKib0HAHxnoLXYZ@git-mongo.uztlwnr.mongodb.net/mern-todo?retryWrites=true&w=majority';
  await mongoose.connect(url);
};

export { connectToDatabase };
