import { Injectable } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';

import { PrismaService } from '../../../database';

interface SupplierFindAllOptions {
  limit: number;
  offset: number;
}

@Injectable()
export class SupplierRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll(
    options: SupplierFindAllOptions = {
      limit: 10,
      offset: 0,
    },
  ): Promise<Supplier[]> {
    return this.prisma.supplier.findMany({
      orderBy: {
        supplierName: 'asc',
      },
      take: options.limit,
      skip: options.offset,
    });
  }

  count(): Promise<number> {
    return this.prisma.supplier.count();
  }

  findById(
    id: string,
  ): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
      where: {
        id,
      },
    });
  }

  findByOracleId(
    oracleId: string,
  ): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
      where: {
        oracleId,
      },
    });
  }

  upsert(
    data: Prisma.SupplierCreateInput,
  ): Promise<Supplier> {
    return this.prisma.supplier.upsert({
      where: {
        oracleId: data.oracleId,
      },
      create: data,
      update: {
        supplierNumber: data.supplierNumber,
        supplierName: data.supplierName,
        taxNumber: data.taxNumber,
        email: data.email,
        phone: data.phone,
        status: data.status,
        syncedAt: new Date(),
      },
    });
  }

  delete(
    id: string,
  ): Promise<Supplier> {
    return this.prisma.supplier.delete({
      where: {
        id,
      },
    });
  }
}
