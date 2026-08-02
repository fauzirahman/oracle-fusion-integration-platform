import { Supplier } from '@prisma/client';

import { SupplierMapper } from '../../../src/modules/suppliers/mappers/supplier.mapper';

import { oracleSupplier, supplierEntity } from '../../utils/test-data';

describe('SupplierMapper', () => {
  describe('toEntity()', () => {
    it('should map OracleSupplierDto to Prisma SupplierCreateInput', () => {
      const entity = SupplierMapper.toEntity(oracleSupplier);

      expect(entity.oracleId).toBe('5001');

      expect(entity.supplierNumber).toBe('SUP001');

      expect(entity.supplierName).toBe('PT ABC Indonesia');

      expect(entity.taxNumber).toBe('01.234.567.8-999.000');

      expect(entity.email).toBe('supplier@abc.co.id');

      expect(entity.phone).toBe('+62215558888');

      expect(entity.status).toBe('ACTIVE');

      expect(entity.syncedAt).toBeInstanceOf(Date);
    });

    it('should trim all string values', () => {
      const entity = SupplierMapper.toEntity({
        ...oracleSupplier,
        SupplierNumber: ' SUP001 ',
        Supplier: ' PT ABC Indonesia ',
        TaxpayerId: ' 01.234 ',
        EmailAddress: ' supplier@test.com ',
        Phone: ' 08123456789 ',
        Status: ' ACTIVE ',
      });

      expect(entity.supplierNumber).toBe('SUP001');

      expect(entity.supplierName).toBe('PT ABC Indonesia');

      expect(entity.taxNumber).toBe('01.234');

      expect(entity.email).toBe('supplier@test.com');

      expect(entity.phone).toBe('08123456789');

      expect(entity.status).toBe('ACTIVE');
    });

    it('should map nullable fields correctly', () => {
      const entity = SupplierMapper.toEntity({
        ...oracleSupplier,
        SupplierNumber: undefined,
        TaxpayerId: undefined,
        EmailAddress: undefined,
        Phone: undefined,
      });

      expect(entity.supplierNumber).toBeNull();

      expect(entity.taxNumber).toBeNull();

      expect(entity.email).toBeNull();

      expect(entity.phone).toBeNull();
    });

    it('should use ACTIVE when status is undefined', () => {
      const entity = SupplierMapper.toEntity({
        ...oracleSupplier,
        Status: undefined,
      });

      expect(entity.status).toBe('ACTIVE');
    });

    it('should convert SupplierId to string', () => {
      const entity = SupplierMapper.toEntity({
        ...oracleSupplier,
        SupplierId: 999,
      });

      expect(entity.oracleId).toBe('999');
    });
  });

  describe('toResponse()', () => {
    it('should map Supplier entity to response dto', () => {
      const response = SupplierMapper.toResponse(supplierEntity as Supplier);

      expect(response).toEqual({
        id: supplierEntity.id,

        supplierNumber: supplierEntity.supplierNumber,

        supplierName: supplierEntity.supplierName,

        taxNumber: supplierEntity.taxNumber,

        email: supplierEntity.email,

        phone: supplierEntity.phone,

        status: supplierEntity.status,
      });
    });

    it('should convert null values to undefined', () => {
      const response = SupplierMapper.toResponse({
        ...supplierEntity,
        supplierNumber: null,
        taxNumber: null,
        email: null,
        phone: null,
        status: null,
      } as Supplier);

      expect(response.supplierNumber).toBeUndefined();

      expect(response.taxNumber).toBeUndefined();

      expect(response.email).toBeUndefined();

      expect(response.phone).toBeUndefined();

      expect(response.status).toBeUndefined();
    });
  });

  describe('toResponseList()', () => {
    it('should map supplier list', () => {
      const result = SupplierMapper.toResponseList([supplierEntity]);

      expect(result).toHaveLength(1);

      expect(result[0].supplierName).toBe('PT ABC Indonesia');
    });

    it('should map multiple suppliers', () => {
      const result = SupplierMapper.toResponseList([
        supplierEntity,
        {
          ...supplierEntity,
          id: 'sup-2',
          oracleId: '5002',
          supplierName: 'PT XYZ',
        },
      ]);

      expect(result).toHaveLength(2);

      expect(result[1].supplierName).toBe('PT XYZ');
    });

    it('should return empty array', () => {
      expect(SupplierMapper.toResponseList([])).toEqual([]);
    });
  });
});
