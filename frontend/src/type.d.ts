interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoProps {
  todo: ITodo;
}

type TODOApiDataType = {
  message?: string;
  todos?: ITodo[];
  todo?: ITodo;
};

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserProps {
  user: IUser;
}

type UserAPIDataType = {
  message?: string;
  users?: IUser[];
  user?: IUser;
};

interface tokenObject {
  _id: string;
  name: string;
  iat: number;
  exp: number;
}
