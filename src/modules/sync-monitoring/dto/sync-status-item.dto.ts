import { ApiProperty } from '@nestjs/swagger';

export class SyncStatusItemDto {
  @ApiProperty({
    example: 'Employee',
    description: 'Synchronization entity.',
  })
  entity: string;

  @ApiProperty({
    example: 'SUCCESS',
    description:
      'Latest synchronization status for the entity.',
  })
  status: string;

  @ApiProperty({
    example: '2026-08-03T07:37:25.917Z',
    nullable: true,
    description: 'Timestamp when the latest successful sync finished.',
  })
  lastSync: Date | null;

  @ApiProperty({
    example: '2026-08-03T07:37:25.893Z',
    nullable: true,
    description: 'Timestamp when the latest successful sync started.',
  })
  startedAt: Date | null;

  @ApiProperty({
    example: 24,
    nullable: true,
    description: 'Synchronization duration in milliseconds.',
  })
  duration: number | null;

  @ApiProperty({
    example: 3,
    description: 'Number of records processed.',
  })
  totalRecords: number;

  @ApiProperty({
    example: 'Inserted=0 | Updated=3 | Failed=0',
    nullable: true,
    description: 'Synchronization result message.',
  })
  message: string | null;
}
