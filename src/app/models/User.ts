export interface User{
  _id?: string;
  lastName: string;
  firstName: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoggedUser{
  user: User;
  accessToken: string;
}