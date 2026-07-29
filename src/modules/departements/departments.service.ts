import { Injectable, NotFoundException } from '@nestjs/common';

import { DepartmentMapper } from './mappers/department.mapper';
import { DepartmentRepository } from './repositories/department.repository';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly repository: DepartmentRepository,
    private readonly mapper: DepartmentMapper,
  ) {}

  async findAll() {
    const departments = await this.repository.findAll();

    return this.mapper.toResponseList(departments);
  }

  async findById(id: string) {
    const department = await this.repository.findById(id);

    if (!department) {
      throw new NotFoundException(
        `Department '${id}' not found`,
      );
    }

    return this.mapper.toResponse(department);
  }
}