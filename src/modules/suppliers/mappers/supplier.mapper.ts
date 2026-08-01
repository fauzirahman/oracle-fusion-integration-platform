import { Injectable } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';

import { OracleSupplierDto } from '../../oracle/dto/oracle-supplier.dto';

@Injectable()
export class SupplierMapper {
  /**
   * Oracle DTO -> Prisma CreateInput
   *
   * Digunakan oleh GenericSyncProcessor.
   */
  static toEntity(dto: OracleSupplierDto): Prisma.SupplierCreateInput {
    return {
      oracleId: String(dto.SupplierId),

      supplierNumber: dto.SupplierNumber ?? null,

      supplierName: dto.Supplier,

      taxNumber: dto.TaxpayerId ?? null,

      email: dto.EmailAddress ?? null,

      phone: dto.Phone ?? null,

      status: dto.Status ?? 'ACTIVE',

      syncedAt: new Date(),
    };
  }

  /**
   * Prisma Entity -> API Response
   */
  static toResponse(entity: Supplier) {
    return {
      id: entity.id,

      oracleId: entity.oracleId,

      supplierNumber: entity.supplierNumber,

      supplierName: entity.supplierName,

      taxNumber: entity.taxNumber,

      email: entity.email,

      phone: entity.phone,

      status: entity.status,

      syncedAt: entity.syncedAt,

      createdAt: entity.createdAt,

      updatedAt: entity.updatedAt,
    };
  }

  /**
   * Prisma Entity[] -> API Response[]
   */
  static toResponseList(items: Supplier[]) {
    return items.map((item) => this.toResponse(item));
  }
}
