import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    example: 21,
    description: 'Total number of records.',
  })
  total: number;

  @ApiProperty({
    example: 10,
    description: 'Number of records returned per request.',
  })
  limit: number;

  @ApiProperty({
    example: 0,
    description: 'Number of records skipped.',
  })
  offset: number;

  @ApiProperty({
    example: 1,
    description: 'Current page number.',
  })
  page: number;

  @ApiProperty({
    example: true,
    description: 'Whether more records are available.',
  })
  hasMore: boolean;
}
