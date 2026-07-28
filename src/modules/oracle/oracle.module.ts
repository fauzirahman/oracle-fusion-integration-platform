import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OracleAuthService } from './auth/oracle-auth.service';
import { OracleClientService } from './client/oracle-client.service';
import { OracleErrorMapper } from './errors/oracle-error.mapper';
import { OracleHttpLogger } from './logger/oracle-http.logger';
import { OracleEmployeeService } from './services/oracle-employee.service';
import { EMPLOYEE_PROVIDER } from '../employees/tokens/employee-provider.token';
import { OraclePaginationService } from './pagination/oracle-pagination.service';

@Module({
  imports: [HttpModule],

  providers: [
    OracleAuthService,
    OracleClientService,
    OracleHttpLogger,
    OracleErrorMapper,

    OracleEmployeeService,
    OraclePaginationService,
    {
      provide: EMPLOYEE_PROVIDER,
      useExisting: OracleEmployeeService,
    },
  ],

  exports: [
    OracleClientService,
    OracleEmployeeService,
    EMPLOYEE_PROVIDER,
    OraclePaginationService,
  ],
})
export class OracleModule {}
