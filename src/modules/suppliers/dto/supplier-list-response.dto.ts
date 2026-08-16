import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto';
import { SupplierResponseDto } from './supplier-response.dto';

export class SupplierListResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates whether the request was successful.',
  })
  success: boolean;

  @ApiProperty({
    example: 'Suppliers retrieved successfully.',
    description: 'Human-readable response message.',
  })
  message: string;

  @ApiProperty({
    type: SupplierResponseDto,
    isArray: true,
    description: 'List of suppliers.',
  })
  data: SupplierResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Pagination metadata.',
  })
  meta: PaginationMetaDto;
}
