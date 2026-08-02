import { OracleEmployeeCollectionDto } from '../../oracle/dto/oracle-employee.dto';

export interface EmployeeProvider {
  find(options?: {
    limit?: number;
    offset?: number;
  }): Promise<OracleEmployeeCollectionDto>;

  findById(personId: string | number): Promise<unknown>;
}
