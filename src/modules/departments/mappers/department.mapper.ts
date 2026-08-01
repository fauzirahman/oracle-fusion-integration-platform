import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';

import { OracleDepartmentDto } from '../../oracle/dto/oracle-department.dto';
import { DepartmentResponseDto } from '../dto/department-response.dto';

@Injectable()
export class DepartmentMapper {
  /**
   * Oracle Fusion DTO -> Prisma Entity
   *
   * Digunakan oleh GenericSyncProcessor.
   */
  static toEntity(
    department: OracleDepartmentDto,
  ): Omit<Department, 'createdAt' | 'updatedAt'> {
    return {
      id: crypto.randomUUID(),
      oracleId: String(department.OrganizationId),
      code: department.OrganizationCode ?? null,
      name: department.Name,
      managerId:
        department.ManagerId !== undefined && department.ManagerId !== null
          ? String(department.ManagerId)
          : null,
    };
  }

  /**
   * Prisma Entity -> API Response
   */
  toResponse(department: Department): DepartmentResponseDto {
    return {
      id: department.id,
      oracleId: department.oracleId,
      name: department.name,
      code: department.code,
      managerId: department.managerId,
    };
  }

  /**
   * Prisma Entity[] -> API Response[]
   */
  toResponseList(departments: Department[]): DepartmentResponseDto[] {
    return departments.map((department) => this.toResponse(department));
  }
}
