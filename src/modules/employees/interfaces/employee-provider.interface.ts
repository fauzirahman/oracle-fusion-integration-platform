import { EmployeeQueryDto } from '../dto/employee-query.dto';

import { OracleEmployeeDto } from '../../oracle/dto/oracle-employee.dto';
import { OracleCollection } from '../../oracle/interfaces/oracle-collection.interface';

export interface EmployeeProvider {
  find(query: EmployeeQueryDto): Promise<OracleCollection<OracleEmployeeDto>>;

  findByPersonNumber(personNumber: string): Promise<OracleEmployeeDto | null>;
}
