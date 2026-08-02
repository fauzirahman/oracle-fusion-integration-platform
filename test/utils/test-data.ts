import { Department, Employee, Supplier } from '@prisma/client';

import { OracleDepartmentDto } from '../../src/modules/oracle/dto/oracle-department.dto';
import { OracleEmployeeDto } from '../../src/modules/oracle/dto/oracle-employee.dto';
import { OracleSupplierDto } from '../../src/modules/oracle/dto/oracle-supplier.dto';

/* ============================================================================
 * EMPLOYEE
 * ==========================================================================*/

export const oracleEmployee: OracleEmployeeDto = {
  PersonId: 1001,

  PersonNumber: 'EMP001',

  DisplayName: 'John Doe',

  FirstName: 'John',

  LastName: 'Doe',

  WorkEmail: 'john.doe@example.com',

  JobName: 'Software Engineer',
};

export const employeeEntity: Employee = {
  id: 'emp-uuid-001',

  oracleId: '1001',

  employeeNumber: 'EMP001',

  firstName: 'John',

  lastName: 'Doe',

  displayName: 'John Doe',

  email: 'john.doe@example.com',

  departmentId: null,

  jobTitle: 'Software Engineer',

  status: 'ACTIVE',

  syncedAt: new Date('2026-01-01T00:00:00.000Z'),

  createdAt: new Date('2026-01-01T00:00:00.000Z'),

  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

/* ============================================================================
 * DEPARTMENT
 * ==========================================================================*/

export const oracleDepartment: OracleDepartmentDto = {
  OrganizationId: 3001,

  OrganizationCode: 'IT',

  Name: 'Information Technology',

  ManagerId: 1001,
};

export const departmentEntity: Department = {
  id: 'dept-uuid-001',

  oracleId: '3001',

  departmentCode: 'IT',

  departmentName: 'Information Technology',

  managerId: '1001',

  syncedAt: new Date('2026-01-01T00:00:00.000Z'),

  createdAt: new Date('2026-01-01T00:00:00.000Z'),

  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

/* ============================================================================
 * SUPPLIER
 * ==========================================================================*/

export const oracleSupplier: OracleSupplierDto = {
  SupplierId: 5001,

  SupplierNumber: 'SUP001',

  Supplier: 'PT ABC Indonesia',

  TaxpayerId: '01.234.567.8-999.000',

  EmailAddress: 'supplier@abc.co.id',

  Phone: '+62215558888',

  Status: 'ACTIVE',
};

export const supplierEntity: Supplier = {
  id: 'sup-uuid-001',

  oracleId: '5001',

  supplierNumber: 'SUP001',

  supplierName: 'PT ABC Indonesia',

  taxNumber: '01.234.567.8-999.000',

  email: 'supplier@abc.co.id',

  phone: '+62215558888',

  status: 'ACTIVE',

  syncedAt: new Date('2026-01-01T00:00:00.000Z'),

  createdAt: new Date('2026-01-01T00:00:00.000Z'),

  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

/* ============================================================================
 * COLLECTIONS
 * ==========================================================================*/

export const employees: Employee[] = [employeeEntity];

export const departments: Department[] = [departmentEntity];

export const suppliers: Supplier[] = [supplierEntity];

export const oracleEmployees: OracleEmployeeDto[] = [oracleEmployee];

export const oracleDepartments: OracleDepartmentDto[] = [oracleDepartment];

export const oracleSuppliers: OracleSupplierDto[] = [oracleSupplier];
