import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '../../../common/dto/pagination-meta.dto';

import { SyncHistoryItemDto } from './sync-history-item.dto';

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
    type: SyncHistoryItemDto,
    isArray: true,
  })
  data: SyncHistoryItemDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
