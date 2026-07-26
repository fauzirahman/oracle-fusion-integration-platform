import { Injectable } from '@nestjs/common';
import { OracleClientService } from '../oracle/client/oracle-client.service';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly oracleClient: OracleClientService) {}

  async findAll() {
    const response: any = await this.oracleClient.get(
      '/hcmRestApi/resources/latest/workers?limit=100',
    );

    const employees = response.items.map((employee: any) => ({
      id: employee.PersonId,
      employeeNumber: employee.PersonNumber,
      fullName: employee.DisplayName,
      firstName: employee.FirstName,
      lastName: employee.LastName,
      department: employee.DepartmentName,
      businessUnit: employee.BusinessUnitName,
      job: employee.JobName,
      email: employee.WorkEmail,
    }));

    return {
      success: true,
      message: 'Employees retrieved successfully',
      data: employees,
      meta: {
        count: employees.length,
      },
    };
  }

  async findById(id: string) {
    const response: any = await this.oracleClient.get(
      '/hcmRestApi/resources/latest/workers?limit=100',
    );

    const employee = response.items.find(
      (item: any) => item.PersonId === Number(id),
    );

    if (!employee) {
      return {
        success: false,
        message: 'Employee not found',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Employee retrieved successfully',
      data: {
        id: employee.PersonId,
        employeeNumber: employee.PersonNumber,
        fullName: employee.DisplayName,
        firstName: employee.FirstName,
        lastName: employee.LastName,
        department: employee.DepartmentName,
        businessUnit: employee.BusinessUnitName,
        job: employee.JobName,
        email: employee.WorkEmail,
      },
    };
  }
}
