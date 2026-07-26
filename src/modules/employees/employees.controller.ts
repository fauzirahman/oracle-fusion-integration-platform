import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all employees',
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get employee by id',
  })
  findById(@Param('id') id: string) {
    return this.employeesService.findById(id);
  }
}
