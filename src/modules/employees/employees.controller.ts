import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@ApiTags('Oracle Employees')
@Controller('oracle/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get employees',
  })
  findAll() {
    return this.employeesService.findAll();
  }
}
