import IAddress from './IAddress';
import IAttachment from './IAttachment';
import ICategory from './ICategory';
import IComorbidity from './IComorbidity';
import IGroup from './IGroup';
import IStatus from './IStatus';

export default interface IPatient {
  id: number;
  name: string;
  cpf: string;
  susCard: string | null;
  phone: string;
  createdAt: Date;
  category: ICategory;
  group: IGroup;
  address: IAddress;
  comorbidityPatient: {
    renOncImun: boolean;
    comorbidity: IComorbidity | null;
  };
  attachment: IAttachment[];
  patientStatus: {
    message: string | null;
    status: IStatus;
  };
}

export interface IPagination {
  data: IPatient[];
  totalCount: number;
}
