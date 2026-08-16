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

import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

import { SupplierListResponseDto } from '../dto/supplier-list-response.dto';
import { SupplierResponseDto } from '../dto/supplier-response.dto';
import { SuppliersService } from '../suppliers.service';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all suppliers',
    description:
      'Returns a paginated list of suppliers.',
  })
  @ApiOkResponse({
    description: 'Suppliers retrieved successfully.',
    type: SupplierListResponseDto,
  })
  findAll(
    @Query() query: PaginationQueryDto,
  ) {
    return this.suppliersService.findAll({
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get supplier by id',
    description:
      'Returns a single supplier by identifier.',
  })
  @ApiParam({
    name: 'id',
    example:
      'e4e7fcb8-9b92-4d6b-8b89-7c8a63b3bdb7',
    description: 'Supplier identifier.',
  })
  @ApiOkResponse({
    description: 'Supplier retrieved successfully.',
    type: SupplierResponseDto,
  })
  findOne(
    @Param('id') id: string,
  ): Promise<SupplierResponseDto> {
    return this.suppliersService.findById(id);
  }
}
