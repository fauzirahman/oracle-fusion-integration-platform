import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';

import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

import { DepartmentRepository } from './repositories/department.repository';
import { DepartmentMapper } from './mappers/department.mapper';
import { OracleDepartmentProvider } from './providers/oracle-department.provider';
import { OracleModule } from '../oracle/oracle.module';

@Module({
  imports: [OracleModule, PrismaModule],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    DepartmentRepository,
    DepartmentMapper,
    OracleDepartmentProvider,
  ],

  exports: [DepartmentRepository, OracleDepartmentProvider],
})
export class DepartmentsModule {}
