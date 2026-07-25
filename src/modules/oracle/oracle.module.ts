import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OracleService } from './oracle.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        timeout: config.get<number>('oracle.timeout') ?? 30000,
        maxRedirects: 5,
      }),
    }),
    EmployeesModule,
  ],
  providers: [OracleService],
  exports: [OracleService],
})
export class OracleModule {}