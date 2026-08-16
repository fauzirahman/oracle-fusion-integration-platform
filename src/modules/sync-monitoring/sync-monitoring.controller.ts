import { Controller, Get, Param, Query } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { SyncMonitoringService } from './sync-monitoring.service';

import { SyncHistoryQueryDto } from './dto/sync-history-query.dto';

import { SyncHistoryResponseDto } from './dto/sync-history-response.dto';

import { SyncRunningResponseDto } from './dto/sync-running-response.dto';

import { SyncStatusResponseDto } from './dto/sync-status-response.dto';

@ApiTags('Synchronization Monitoring')
@Controller('sync')
export class SyncMonitoringController {
  constructor(private readonly service: SyncMonitoringService) {}

  @Get('status')
  @ApiOperation({
    summary: 'Get synchronization status',
    description:
      'Returns the latest successful synchronization status for Employee, Department, and Supplier.',
  })
  @ApiOkResponse({
    type: SyncStatusResponseDto,
    description: 'Synchronization status retrieved successfully.',
  })
  async status() {
    return this.service.status();
  }

  @Get('running')
  @ApiOperation({
    summary: 'Get running synchronization jobs',
    description: 'Returns synchronization jobs that are currently running.',
  })
  @ApiOkResponse({
    type: SyncRunningResponseDto,
    description: 'Running synchronization jobs retrieved successfully.',
  })
  async running() {
    return this.service.running();
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get synchronization history',
    description:
      'Returns paginated synchronization history for all supported entities.',
  })
  @ApiOkResponse({
    type: SyncHistoryResponseDto,
    description: 'Synchronization history retrieved successfully.',
  })
  async history(@Query() query: SyncHistoryQueryDto) {
    return this.service.history(undefined, query);
  }

  @Get('history/:entity')
  @ApiOperation({
    summary: 'Get synchronization history by entity',
    description:
      'Returns paginated synchronization history for a specific entity.',
  })
  @ApiParam({
    name: 'entity',
    description: 'Synchronization entity.',
    enum: ['Employee', 'Department', 'Supplier'],
    example: 'Employee',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 20,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    example: 0,
  })
  @ApiBadRequestResponse({
    description: 'Unsupported synchronization entity.',
  })
  @ApiOkResponse({
    type: SyncHistoryResponseDto,
    description: 'Synchronization history retrieved successfully.',
  })
  async historyByEntity(
    @Param('entity') entity: string,
    @Query() query: SyncHistoryQueryDto,
  ) {
    return this.service.history(entity, query);
  }
}
