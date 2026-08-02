import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';
import { OracleModule } from '../oracle/oracle.module';

import { SuppliersController } from './controller/suppliers.controller';
import { SupplierRepository } from './repositories/supplier.repository';
import { SuppliersService } from './suppliers.service';
import { OracleSupplierProvider } from './providers/oracle-supplier.provider';

@Module({
  imports: [PrismaModule, OracleModule],
  controllers: [SuppliersController],
  providers: [SuppliersService, SupplierRepository, OracleSupplierProvider],
  exports: [SuppliersService, SupplierRepository, OracleSupplierProvider],
})
export class SuppliersModule {}
