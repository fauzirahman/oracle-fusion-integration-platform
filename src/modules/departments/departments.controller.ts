import { Controller, Get, Param } from '@nestjs/common';

import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id')
    id: string,
  ) {
    return this.departmentsService.findById(id);
  }
}
