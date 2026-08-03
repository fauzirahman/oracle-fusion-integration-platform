import { Injectable } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';

import { OracleSupplierDto } from '../../oracle/dto/oracle-supplier.dto';
import { SupplierResponseDto } from '../dto/supplier-response.dto';

@Injectable()
export class SupplierMapper {
  /**
   * Oracle DTO -> Prisma CreateInput
   */
  static toEntity(dto: OracleSupplierDto): Prisma.SupplierCreateInput {
    return {
      oracleId: String(dto.SupplierId),

      supplierNumber: dto.SupplierNumber?.trim() ?? null,

      /**
       * Oracle Fusion dapat mengembalikan SupplierName.
       * Tetap kompatibel apabila mock atau implementasi lama
       * masih menggunakan field Supplier.
       */
      supplierName: String(
        (dto.SupplierName ?? dto.Supplier ?? '').trim(),
      ).trim(),

      taxNumber: dto.TaxpayerId?.trim() ?? null,

      email: dto.EmailAddress?.trim() ?? null,

      phone: dto.Phone?.trim() ?? null,

      status: dto.Status?.trim() ?? 'ACTIVE',

      syncedAt: new Date(),
    };
  }

  /**
   * Prisma Entity -> Response DTO
   */
  static toResponse(entity: Supplier): SupplierResponseDto {
    return {
      id: entity.id,

      supplierNumber: entity.supplierNumber ?? undefined,

      supplierName: entity.supplierName,

      taxNumber: entity.taxNumber ?? undefined,

      email: entity.email ?? undefined,

      phone: entity.phone ?? undefined,

      status: entity.status ?? undefined,
    };
  }

  /**
   * Prisma Entity[] -> Response DTO[]
   */
  static toResponseList(items: Supplier[]): SupplierResponseDto[] {
    return items.map((item) => this.toResponse(item));
  }
}
