import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto';
import { DepartmentResponseDto } from './department-response.dto';

export class DepartmentListResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates whether the request was successful.',
  })
  success: boolean;

  @ApiProperty({
    example: 'Departments retrieved successfully.',
    description: 'Human-readable response message.',
  })
  message: string;

  @ApiProperty({
    type: DepartmentResponseDto,
    isArray: true,
    description: 'List of departments.',
  })
  data: DepartmentResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Pagination metadata.',
  })
  meta: PaginationMetaDto;
}
