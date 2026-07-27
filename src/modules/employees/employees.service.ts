import { OracleClientService } from '../oracle/client/oracle-client.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EmployeeMapper } from './mappers/employee.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OracleWorker } from './interfaces/oracle-worker.interface';
import { OracleCollectionResponse } from '../oracle/interfaces/oracle-collection-response.interface';

@Injectable()
export class EmployeesService {
  constructor(private readonly oracleClient: OracleClientService) {}

  async findAll(query: PaginationQueryDto) {    
    const response = await this.oracleClient.get<
      OracleCollectionResponse<OracleWorker>
    >('/hcmRestApi/resources/latest/workers?limit=100');

    let employees = EmployeeMapper.toResponseList(response.items);

    if (query.search) {
      const keyword = query.search.toLowerCase();

      employees = employees.filter((employee) =>
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
    const response = await this.oracleClient.get<
      OracleCollectionResponse<OracleWorker>
    >('/hcmRestApi/resources/latest/workers?limit=100');

    const employee = response.items.find(
      (item: OracleWorker) => item.PersonId === Number(id),
    );

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