export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserData {
  data: User[];
  meta: Meta;
}

export interface Meta {
  page: number;
}
