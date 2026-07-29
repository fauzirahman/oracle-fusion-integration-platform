import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';

import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

import { DepartmentRepository } from './repositories/departments.repository';
import { DepartmentMapper } from './mappers/department.mapper';

@Module({
  imports: [PrismaModule],

  controllers: [
    DepartmentsController,
  ],

  providers: [
    DepartmentsService,
    DepartmentRepository,
    DepartmentMapper,
  ],

  exports: [
    DepartmentRepository,
  ],
})
export class DepartmentsModule {}