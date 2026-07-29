import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { OracleModule } from '../oracle/oracle.module';
import { EmployeeMapper } from './mappers/employee.mapper';
import { EmployeeRepository } from './repositories/employee.repository';

@Module({
  imports: [OracleModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeMapper, EmployeeRepository],
  exports: [EmployeeRepository],
})
export class EmployeesModule {}
