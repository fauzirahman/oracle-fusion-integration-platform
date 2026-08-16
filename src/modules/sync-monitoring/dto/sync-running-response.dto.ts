import { ApiProperty } from '@nestjs/swagger';

export class SyncRunningItemDto {
  @ApiProperty({
    example: 'Employee',
  })
  entity: string;

  @ApiProperty({
    example: 'RUNNING',
  })
  status: string;

  @ApiProperty({
    example: '2026-08-16T03:15:01.893Z',
  })
  startedAt: Date;
}

export class SyncRunningResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example: 'Running synchronization jobs retrieved successfully.',
  })
  message: string;

  @ApiProperty({
    type: [SyncRunningItemDto],
  })
  data: SyncRunningItemDto[];
}
