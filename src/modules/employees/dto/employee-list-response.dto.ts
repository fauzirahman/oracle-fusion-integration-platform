import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto';
import { EmployeeResponseDto } from './employee-response.dto';

export class EmployeeListResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates whether the request was successful.',
  })
  success: boolean;

  @ApiProperty({
    example: 'Employees retrieved successfully',
    description: 'Human-readable response message.',
  })
  message: string;

  @ApiProperty({
    type: EmployeeResponseDto,
    isArray: true,
    description: 'List of employees.',
  })
  data: EmployeeResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Pagination metadata.',
  })
  meta: PaginationMetaDto;
}
