export default interface IUser {
  id: number;
  name: string;
  username: string;
  admin: boolean;
  createdAt: Date;
}

export interface IPagination {
  data: IUser[];
  page: number;
  totalCount: number;
}
