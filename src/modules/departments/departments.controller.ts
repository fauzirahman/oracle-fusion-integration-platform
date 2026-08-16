import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

import { DepartmentListResponseDto } from './dto/department-list-response.dto';
import { DepartmentResponseDto } from './dto/department-response.dto';
import { DepartmentsService } from './departments.service';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all departments',
    description:
      'Returns a paginated list of departments.',
  })
  @ApiOkResponse({
    description: 'Departments retrieved successfully.',
    type: DepartmentListResponseDto,
  })
  findAll(
    @Query() query: PaginationQueryDto,
  ) {
    return this.departmentsService.findAll({
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get department by id',
    description:
      'Returns a single department by identifier.',
  })
  @ApiParam({
    name: 'id',
    example:
      '46ef17b0-eda7-49aa-8be7-bb13ea777f4f',
    description: 'Department identifier.',
  })
  @ApiOkResponse({
    description: 'Department retrieved successfully.',
    type: DepartmentResponseDto,
  })
  findById(
    @Param('id') id: string,
  ) {
    return this.departmentsService.findById(id);
  }
}
