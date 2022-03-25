export interface User{
  _id?: string;
  lastName: string;
  firstName: string;
  userName: string;
  email: string;
  password: string;
  digitalKey?: string;
}

export interface LoggedUser{
  user: User;
  accessToken: string;
}