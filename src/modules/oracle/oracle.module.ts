import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OracleAuthService } from './auth/oracle-auth.service';
import { OracleClientService } from './client/oracle-client.service';
import { OracleErrorMapper } from './errors/oracle-error.mapper';
import { OracleHttpLogger } from './logger/oracle-http.logger';
import { OraclePaginationService } from './pagination/oracle-pagination.service';
import { OracleEmployeeProvider } from './providers/oracle-employee.provider';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [HttpModule, CommonModule],

  providers: [
    OracleAuthService,
    OracleHttpLogger,
    OracleErrorMapper,
    OracleClientService,
    OraclePaginationService,

    OracleEmployeeProvider,
  ],

  exports: [
    OracleClientService,
    OraclePaginationService,

    OracleEmployeeProvider,
  ],
})
export class OracleModule {}
