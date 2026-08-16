import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { EmployeeQueryDto } from './dto/employee-query.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { EmployeeListResponseDto } from './dto/employee-list-response.dto';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all employees',
    description:
      'Returns a paginated list of employees with optional search filters.',
  })
  @ApiOkResponse({
    description: 'Employees retrieved successfully.',
    type: EmployeeListResponseDto,
  })
  findAll(
    @Query() query: EmployeeQueryDto,
  ) {
    return this.employeesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get employee by person number',
    description:
      'Returns a single employee by identifier.',
  })
  @ApiParam({
    name: 'id',
    example: 'EMP-001',
    description: 'Employee identifier.',
  })
  @ApiOkResponse({
    description: 'Employee retrieved successfully.',
    type: EmployeeResponseDto,
  })
  findById(
    @Param('id') id: string,
  ) {
    return this.employeesService.findById(id);
  }
}
