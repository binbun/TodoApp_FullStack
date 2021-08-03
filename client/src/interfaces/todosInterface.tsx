export interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
    author: User;
  }
  
  export interface User {
    _id: string;
    username: string;
    email: String;
    isAdmin: Boolean;
  }
  