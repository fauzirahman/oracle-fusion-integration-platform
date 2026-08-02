import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SupplierResponseDto } from '../dto/supplier-response.dto';
import { SuppliersService } from '../suppliers.service';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all suppliers',
  })
  @ApiOkResponse({
    type: SupplierResponseDto,
    isArray: true,
  })
  findAll(): Promise<SupplierResponseDto[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get supplier by id',
  })
  @ApiParam({
    name: 'id',
    example: '2f82e7af-2e08-4b8d-a93b-63c7c4ef8d67',
  })
  @ApiOkResponse({
    type: SupplierResponseDto,
  })
  findOne(@Param('id') id: string): Promise<SupplierResponseDto> {
    return this.suppliersService.findById(id);
  }
}
