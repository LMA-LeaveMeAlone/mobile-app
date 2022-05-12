export interface User{
  _id?: string;
  lastName: string;
  firstName: string;
  userName: string;
  email: string;
  password?: string;
}

export interface RegisterUser{
  user: User;
  digitalKey: string;
}

export interface LoginUser{
  user: User;
  accessToken: string;
}