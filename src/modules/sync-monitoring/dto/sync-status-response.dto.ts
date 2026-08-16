import { ApiProperty } from '@nestjs/swagger';

export class SyncStatusItemDto {
  @ApiProperty({
    example: 'Employee',
  })
  entity: string;

  @ApiProperty({
    example: 'SUCCESS',
  })
  status: string;

  @ApiProperty({
    example: '2026-08-16T03:15:25.917Z',
    nullable: true,
  })
  lastSync: Date | null;

  @ApiProperty({
    example: '2026-08-16T03:15:01.893Z',
    nullable: true,
  })
  startedAt: Date | null;

  @ApiProperty({
    example: 24,
    nullable: true,
  })
  duration: number | null;

  @ApiProperty({
    example: 3,
  })
  totalRecords: number;

  @ApiProperty({
    example: 'Inserted=0 | Updated=3 | Failed=0',
    nullable: true,
  })
  message: string | null;
}

export class SyncStatusResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example: 'Synchronization status retrieved successfully.',
  })
  message: string;

  @ApiProperty({
    type: [SyncStatusItemDto],
  })
  data: SyncStatusItemDto[];
}
