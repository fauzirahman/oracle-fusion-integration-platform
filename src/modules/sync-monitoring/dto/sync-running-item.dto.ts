import { ApiProperty } from '@nestjs/swagger';

export class SyncRunningItemDto {
  @ApiProperty({
    example: 'Employee',
    description: 'Synchronization entity currently running.',
  })
  entity: string;

  @ApiProperty({
    example: '2026-08-16T03:10:00.000Z',
    description: 'Timestamp when the synchronization started.',
  })
  startedAt: Date;

  @ApiProperty({
    example: 'RUNNING',
    description: 'Current synchronization status.',
  })
  status: string;
}
