export class EmployeeMapper {
  static toResponse(employee: any) {
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

  static toResponseList(items: any[]) {
    return items.map((item) => this.toResponse(item));
  }
}
