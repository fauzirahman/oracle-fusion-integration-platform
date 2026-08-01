import { Injectable } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';

import { PrismaService } from '../../../database';

@Injectable()
export class SupplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany({
      orderBy: {
        supplierName: 'asc',
      },
    });
  }

  findById(id: string): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
      where: { id },
    });
  }

  findByOracleId(oracleId: string): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
      where: {
        oracleId,
      },
    });
  }

  upsert(data: Prisma.SupplierCreateInput): Promise<Supplier> {
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

  delete(id: string): Promise<Supplier> {
    return this.prisma.supplier.delete({
      where: {
        id,
      },
    });
  }
}
