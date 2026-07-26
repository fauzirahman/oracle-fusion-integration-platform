import { Injectable } from '@nestjs/common';
import { OracleClientService } from '../oracle/client/oracle-client.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EmployeeMapper } from './mappers/employee.mapper';

@Injectable()
export class EmployeesService {
  constructor(private readonly oracleClient: OracleClientService) {}

  async findAll(query: PaginationQueryDto) {
    const response: any = await this.oracleClient.get(
      '/hcmRestApi/resources/latest/workers?limit=100',
    );

    let employees = EmployeeMapper.toResponseList(response.items);

    if (query.search) {
      const keyword = query.search.toLowerCase();

      employees = employees.filter((employee: any) =>
        employee.fullName.toLowerCase().includes(keyword),
      );
    }

    const total = employees.length;

    employees = employees.slice(query.offset, query.offset + query.limit);

    return {
      success: true,
      message: 'Employees retrieved successfully',
      data: employees,
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
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
      data: EmployeeMapper.toResponse(employee),
    };
  }
}