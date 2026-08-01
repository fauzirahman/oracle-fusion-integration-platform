import { OracleCollection } from '../interfaces/oracle-collection.interface';

export interface OracleEmployeeDto {
  PersonId: number;

  PersonNumber: string;

  DisplayName: string;

  FirstName?: string;

  LastName?: string;

  DepartmentName?: string;

  BusinessUnitName?: string;

  JobName?: string;

  WorkEmail?: string;
}

export type OracleEmployeeCollectionDto = OracleCollection<OracleEmployeeDto>;
