export default interface IPatient {
  id: number;
  name: string;
  cpf: string;
  susCard: string;
  phone: string;
  idDocFront: string;
  idDocVerse: string;
  addressProof: string;
  photo: string;
  createdAt: Date;
  group: {
    slug: string;
    group: string;
  };
  address: {
    street: string;
    number: number;
    complement: string;
    reference: string;
    neighborhood: string;
  };
  comorbidityPatient: {
    medicalReport: string | null;
    medicalAuthorization: string | null;
    medicalPrescription: string | null;
  } | null;
  patientStatus: {
    message: string | null;
    status: {
      id: number;
      status: string;
    };
  };
}

export interface IPagination {
  data: IPatient[];
  totalCount: number;
}
