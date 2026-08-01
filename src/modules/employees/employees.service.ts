import { Injectable, NotFoundException } from '@nestjs/common';

import { EmployeeMapper } from './mappers/employee.mapper';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeQueryDto } from './dto/employee-query.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly repository: EmployeeRepository) {}

  async findAll(query?: EmployeeQueryDto) {
    const employees = await this.repository.findAll();

    const data = EmployeeMapper.toResponseList(employees);

    return {
      success: true,
      message: 'Employees retrieved successfully',
      data,
      meta: {
        total: data.length,
        limit: query?.limit ?? data.length,
        offset: query?.offset ?? 0,
      },
    };
  }

  async findById(id: string) {
    const employee = await this.repository.findById(id);

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
