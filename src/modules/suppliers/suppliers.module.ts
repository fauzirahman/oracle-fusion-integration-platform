import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';
import { OracleModule } from '../oracle/oracle.module';

import { SuppliersController } from './suppliers.controller';

import { SupplierRepository } from './repositories/supplier.repository';
import { OracleSupplierProvider } from './providers/oracle-supplier.provider';
import { SuppliersService } from './suppliers.service';
import { SupplierMapper } from './mappers/supplier.mapper';

@Module({
  imports: [PrismaModule, OracleModule],
  controllers: [SuppliersController],
  providers: [
    SuppliersService,
    SupplierRepository,
    SupplierMapper,
    OracleSupplierProvider,
  ],
   exports: [
    SuppliersService,
    SupplierRepository,
    SupplierMapper,
    OracleSupplierProvider,
  ],
})
export class SuppliersModule {}
