import { OracleEmployeeDto } from '../../oracle/dto/oracle-employee.dto';

export class EmployeeMapper {
  static toResponse(employee: OracleEmployeeDto) {
    return {
      id: employee.PersonId,
      employeeNumber: employee.PersonNumber,
      fullName: employee.DisplayName,
      firstName: employee.FirstName,
      lastName: employee.LastName,
      department: employee.DepartmentName,
      businessUnit: employee.BusinessUnitName,
      job: employee.JobName,
      email: employee.WorkEmail,
    };
  }

  static toResponseList(items: OracleEmployeeDto[]) {
    return items.map((item) => this.toResponse(item));
  }
}
