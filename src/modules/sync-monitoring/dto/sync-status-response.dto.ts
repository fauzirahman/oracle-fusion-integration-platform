import { ApiProperty } from '@nestjs/swagger';

import { SyncStatusItemDto } from './sync-status-item.dto';

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
    type: SyncStatusItemDto,
    isArray: true,
  })
  data: SyncStatusItemDto[];
}
