import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { DepartmentResponseDto } from '../dto/department-response.dto';

@Injectable()
export class DepartmentMapper {
  toResponse(
    department: Department,
  ): DepartmentResponseDto {
    return {
      id: department.id,
      oracleId: department.oracleId,
      name: department.name,
      code: department.code,
      managerId: department.managerId,
    };
  }

  toResponseList(
    departments: Department[],
  ): DepartmentResponseDto[] {
    return departments.map((department) =>
      this.toResponse(department),
    );
  }
}