import { ApiProperty } from '@nestjs/swagger';

import { SyncRunningItemDto } from './sync-running-item.dto';

export class SyncRunningResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example:
      'Running synchronization jobs retrieved successfully.',
  })
  message: string;

  @ApiProperty({
    type: SyncRunningItemDto,
    isArray: true,
  })
  data: SyncRunningItemDto[];
}
