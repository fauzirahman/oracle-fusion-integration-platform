import { Employee, Prisma } from '@prisma/client';

import { OracleEmployeeDto } from '../../oracle/dto/oracle-employee.dto';

export class EmployeeMapper {
  static toEntity(
    employee: OracleEmployeeDto,
  ): Prisma.EmployeeUncheckedCreateInput {
    return {
      oracleId: String(employee.PersonId),

      employeeNumber: employee.PersonNumber ?? null,

      firstName: employee.FirstName ?? '',

      lastName: employee.LastName ?? '',

      displayName:
        employee.DisplayName ??
        `${employee.FirstName ?? ''} ${employee.LastName ?? ''}`.trim(),

      email: employee.WorkEmail ?? null,

      departmentId: null,

      jobTitle: employee.JobName ?? null,

      status: 'ACTIVE',

      syncedAt: new Date(),
    };
  }

  static toResponse(employee: Employee) {
    return {
      id: employee.id,

      oracleId: employee.oracleId,

      employeeNumber: employee.employeeNumber,

      firstName: employee.firstName,

      lastName: employee.lastName,

      displayName: employee.displayName,

      email: employee.email,

      departmentId: employee.departmentId,

      jobTitle: employee.jobTitle,

      status: employee.status,

      syncedAt: employee.syncedAt,

      createdAt: employee.createdAt,

      updatedAt: employee.updatedAt,
    };
  }

  static toResponseList(employees: Employee[]) {
    return employees.map((employee) => this.toResponse(employee));
  }
}
