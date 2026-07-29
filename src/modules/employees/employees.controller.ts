import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { EmployeeQueryDto } from './dto/employee-query.dto';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all employees',
  })
  findAll(@Query() query: EmployeeQueryDto) {
    return this.employeesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get employee by person number',
  })
  findById(@Param('id') id: string) {
    return this.employeesService.findById(id);
  }
}
