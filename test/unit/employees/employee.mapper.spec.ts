import { Employee } from '@prisma/client';

import { EmployeeMapper } from '../../../src/modules/employees/mappers/employee.mapper';
import { employeeEntity, oracleEmployee } from '../../utils/test-data';

describe('EmployeeMapper', () => {
  describe('toEntity()', () => {
    it('should map OracleEmployeeDto to Prisma EmployeeUncheckedCreateInput', () => {
      const entity = EmployeeMapper.toEntity(oracleEmployee);

      expect(entity.oracleId).toBe('1001');
      expect(entity.employeeNumber).toBe('EMP001');
      expect(entity.firstName).toBe('John');
      expect(entity.lastName).toBe('Doe');
      expect(entity.displayName).toBe('John Doe');
      expect(entity.email).toBe('john.doe@example.com');

      expect(entity.departmentId).toBeNull();

      expect(entity.jobTitle).toBe('Software Engineer');

      expect(entity.status).toBe('ACTIVE');

      expect(entity.syncedAt).toBeInstanceOf(Date);
    });

    it('should build displayName when DisplayName is undefined', () => {
      const entity = EmployeeMapper.toEntity({
        ...oracleEmployee,
        DisplayName: undefined,
      });

      expect(entity.displayName).toBe('John Doe');
    });

    it('should return empty string when first and last name are missing', () => {
      const entity = EmployeeMapper.toEntity({
        ...oracleEmployee,
        DisplayName: undefined,
        FirstName: undefined,
        LastName: undefined,
      });

      expect(entity.firstName).toBe('');
      expect(entity.lastName).toBe('');
      expect(entity.displayName).toBe('');
    });

    it('should map nullable values correctly', () => {
      const entity = EmployeeMapper.toEntity({
        ...oracleEmployee,
        PersonNumber: undefined,
        WorkEmail: undefined,
        JobName: undefined,
      });

      expect(entity.employeeNumber).toBeNull();
      expect(entity.email).toBeNull();
      expect(entity.jobTitle).toBeNull();
    });
  });

  describe('toResponse()', () => {
    it('should map Employee entity to response object', () => {
      const response = EmployeeMapper.toResponse(employeeEntity as Employee);

      expect(response).toEqual({
        id: employeeEntity.id,
        oracleId: employeeEntity.oracleId,
        employeeNumber: employeeEntity.employeeNumber,
        firstName: employeeEntity.firstName,
        lastName: employeeEntity.lastName,
        displayName: employeeEntity.displayName,
        email: employeeEntity.email,
        departmentId: employeeEntity.departmentId,
        jobTitle: employeeEntity.jobTitle,
        status: employeeEntity.status,
        syncedAt: employeeEntity.syncedAt,
        createdAt: employeeEntity.createdAt,
        updatedAt: employeeEntity.updatedAt,
      });
    });
  });

  describe('toResponseList()', () => {
    it('should map list of Employee entities', () => {
      const result = EmployeeMapper.toResponseList([employeeEntity]);

      expect(result).toHaveLength(1);

      expect(result[0].oracleId).toBe('1001');

      expect(result[0].displayName).toBe('John Doe');
    });

    it('should return empty array', () => {
      expect(EmployeeMapper.toResponseList([])).toEqual([]);
    });
  });
});
