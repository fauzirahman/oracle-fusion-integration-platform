import { OracleWorker } from '../interfaces/oracle-worker.interface';

export class EmployeeMapper {
  static toResponse(employee: OracleWorker) {
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

  static toResponseList(items: OracleWorker[]) {
    return items.map((item) => this.toResponse(item));
  }
}