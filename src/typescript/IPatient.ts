export default interface IPatient {
  id: number;
  name: string;
  cpf: string;
  createdAt: Date;
}

export interface IPagination {
  data: IPatient[];
  page: number;
  totalCount: number;
}
