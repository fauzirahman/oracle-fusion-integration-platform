import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SyncMonitoringService } from './sync-monitoring.service';

@ApiTags('Synchronization Monitoring')
@Controller('sync')
export class SyncMonitoringController {
  constructor(private readonly service: SyncMonitoringService) {}

  @Get('status')
  @ApiOperation({
    summary: 'Get synchronization status',
  })
  @ApiOkResponse({
    description: 'Latest synchronization status.',
  })
  status() {
    return this.service.status();
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get synchronization history',
  })
  history() {
    return this.service.history();
  }

  @Get('history/:entity')
  @ApiOperation({
    summary: 'Get synchronization history by entity',
  })
  @ApiParam({
    name: 'entity',
    example: 'Employee',
  })
  historyByEntity(@Param('entity') entity: string) {
    return this.service.history(entity);
  }

  @Get('running')
  @ApiOperation({
    summary: 'Get running synchronization jobs',
  })
  running() {
    return this.service.running();
  }
}
