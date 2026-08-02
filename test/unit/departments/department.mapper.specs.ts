import { Department } from '@prisma/client';

import { DepartmentMapper } from '../../../src/modules/departments/mappers/department.mapper';
import { departmentEntity, oracleDepartment } from '../../utils/test-data';

describe('DepartmentMapper', () => {
  let mapper: DepartmentMapper;

  beforeEach(() => {
    mapper = new DepartmentMapper();
  });

  describe('toEntity()', () => {
    it('should map OracleDepartmentDto to Department entity', () => {
      const entity = DepartmentMapper.toEntity(oracleDepartment);

      expect(entity.id).toBeDefined();

      expect(entity.oracleId).toBe('3001');

      expect(entity.code).toBe('IT');

      expect(entity.name).toBe('Information Technology');

      expect(entity.managerId).toBe('1001');
    });

    it('should generate a uuid', () => {
      const entity = DepartmentMapper.toEntity(oracleDepartment);

      expect(entity.id).toEqual(expect.any(String));

      expect(entity.id.length).toBeGreaterThan(0);
    });

    it('should set nullable values correctly', () => {
      const entity = DepartmentMapper.toEntity({
        ...oracleDepartment,
        OrganizationCode: undefined,
        ManagerId: undefined,
      });

      expect(entity.code).toBeNull();

      expect(entity.managerId).toBeNull();
    });

    it('should convert numeric managerId to string', () => {
      const entity = DepartmentMapper.toEntity({
        ...oracleDepartment,
        ManagerId: 9999,
      });

      expect(entity.managerId).toBe('9999');
    });
  });

  describe('toResponse()', () => {
    it('should map Department entity to response dto', () => {
      const response = mapper.toResponse(departmentEntity as Department);

      expect(response).toEqual({
        id: departmentEntity.id,
        oracleId: departmentEntity.oracleId,
        code: departmentEntity.code,
        name: departmentEntity.name,
        managerId: departmentEntity.managerId,
      });
    });
  });

  describe('toResponseList()', () => {
    it('should map list of departments', () => {
      const result = mapper.toResponseList([departmentEntity]);

      expect(result).toHaveLength(1);

      expect(result[0].oracleId).toBe('3001');

      expect(result[0].name).toBe('Information Technology');
    });

    it('should return empty array', () => {
      expect(mapper.toResponseList([])).toEqual([]);
    });
  });
});
