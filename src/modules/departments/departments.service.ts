import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DepartmentMapper } from './mappers/department.mapper';
import {
  DepartmentFindAllOptions,
  DepartmentRepository,
} from './repositories/department.repository';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly repository: DepartmentRepository,
    private readonly mapper: DepartmentMapper,
  ) {}

  async findAll(
    options?: DepartmentFindAllOptions,
  ) {
    const limit = options?.limit ?? 10;
    const offset = options?.offset ?? 0;

    const [departments, total] =
      await Promise.all([
        this.repository.findAll({
          limit,
          offset,
        }),
        this.repository.count(),
      ]);

    const data =
      this.mapper.toResponseList(departments);

    return {
      success: true,
      message: 'Departments retrieved successfully.',
      data,
      meta: {
        total,
        limit,
        offset,
        page: Math.floor(offset / limit) + 1,
        hasMore: offset + data.length < total,
      },
    };
  }

  async findById(id: string) {
    const department =
      await this.repository.findById(id);

    if (!department) {
      throw new NotFoundException(
        `Department '${id}' not found`,
      );
    }

    return {
      success: true,
      message: 'Department retrieved successfully.',
      data: this.mapper.toResponse(department),
    };
  }
}
