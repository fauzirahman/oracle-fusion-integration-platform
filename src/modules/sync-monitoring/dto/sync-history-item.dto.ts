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
    nullable: true,
  })
  duration: number | null;

  @ApiProperty({
    example: 'Inserted=0 | Updated=3 | Failed=0',
    nullable: true,
  })
  message: string | null;

  @ApiProperty({
    example: '2026-08-03T07:37:25.893Z',
  })
  startedAt: Date;

  @ApiProperty({
    example: '2026-08-03T07:37:25.917Z',
    nullable: true,
  })
  finishedAt: Date | null;
}
