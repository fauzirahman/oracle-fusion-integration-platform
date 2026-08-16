import { ApiProperty } from '@nestjs/swagger';

export class SyncHistoryItemDto {
  @ApiProperty({
    example: '75f38f8c-ad36-42c5-9f37-ddc26d79dad5',
  })
  id: string;

  @ApiProperty({
    example: 'Employee',
  })
  entity: string;

  @ApiProperty({
    example: 'INCREMENTAL',
  })
  operation: string;

  @ApiProperty({
    example: 'SUCCESS',
  })
  status: string;

  @ApiProperty({
    example: 3,
  })
  totalRecords: number;

  @ApiProperty({
    example: 24,
  })
  duration: number;

  @ApiProperty({
    example: 'Inserted=0 | Updated=3 | Failed=0',
    nullable: true,
  })
  message: string | null;

  @ApiProperty({
    example: '2026-08-16T03:15:01.893Z',
  })
  startedAt: Date;

  @ApiProperty({
    example: '2026-08-16T03:15:01.917Z',
    nullable: true,
  })
  finishedAt: Date | null;
}

export class SyncHistoryMetaDto {
  @ApiProperty({
    example: 13,
  })
  total: number;

  @ApiProperty({
    example: 20,
  })
  limit: number;

  @ApiProperty({
    example: 0,
  })
  offset: number;

  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: true,
  })
  hasMore: boolean;
}

export class SyncHistoryResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example: 'Synchronization history retrieved successfully.',
  })
  message: string;

  @ApiProperty({
    type: [SyncHistoryItemDto],
  })
  data: SyncHistoryItemDto[];

  @ApiProperty({
    type: SyncHistoryMetaDto,
  })
  meta: SyncHistoryMetaDto;
}
