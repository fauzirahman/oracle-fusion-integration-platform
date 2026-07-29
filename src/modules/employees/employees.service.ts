import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { EmployeeQueryDto } from './dto/employee-query.dto';
import { EmployeeMapper } from './mappers/employee.mapper';
import type { EmployeeProvider } from './interfaces/employee-provider.interface';
import { EMPLOYEE_PROVIDER } from './tokens/employee-provider.token';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEE_PROVIDER)
    private readonly employeeProvider: EmployeeProvider,
  ) {}

  async findAll(query: EmployeeQueryDto) {
    const response = await this.employeeProvider.find(query);

    const employees = EmployeeMapper.toResponseList(response.items);

    return {
      success: true,
      message: 'Employees retrieved successfully',
      data: employees,
      meta: {
        total: response.totalResults ?? employees.length,

        limit: query.limit ?? 25,

        offset: query.offset ?? 0,
      },
    };
  }

  async findById(id: string) {
    const employee = await this.employeeProvider.findByPersonNumber(id);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return {
      success: true,
      message: 'Employee retrieved successfully',
      data: EmployeeMapper.toResponse(employee),
    };
  }
}
