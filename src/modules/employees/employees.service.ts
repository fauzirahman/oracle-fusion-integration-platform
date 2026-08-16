import { Injectable, NotFoundException } from '@nestjs/common';

import { EmployeeMapper } from './mappers/employee.mapper';
import {
  EmployeeFindAllOptions,
  EmployeeRepository,
} from './repositories/employee.repository';
import { EmployeeQueryDto } from './dto/employee-query.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly repository: EmployeeRepository) {}

  async findAll(query?: EmployeeQueryDto) {
    const options: EmployeeFindAllOptions = {
      search: query?.search,
      personNumber: query?.personNumber,
      email: query?.email,
      limit: query?.limit ?? 25,
      offset: query?.offset ?? 0,
    };

    const [employees, total] = await Promise.all([
      this.repository.findAll(options),
      this.repository.count(options),
    ]);

    const data = EmployeeMapper.toResponseList(employees);

    // Resolve optional repository values into
    // concrete pagination values.
    const limit = options.limit ?? 25;
    const offset = options.offset ?? 0;

    return {
      success: true,
      message: 'Employees retrieved successfully',
      data,
      meta: {
        total,
        limit,
        offset,
        page: Math.floor(offset / limit) + 1,
        hasMore: offset + data.length < total,
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
