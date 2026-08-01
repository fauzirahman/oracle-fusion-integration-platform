import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Application health status',
  })
  @ApiOkResponse({
    description: 'Application health information.',
  })
  health() {
    return this.healthService.health();
  }

  @Get('database')
  @ApiOperation({
    summary: 'Database health',
  })
  database() {
    return this.healthService.database();
  }

  @Get('oracle')
  @ApiOperation({
    summary: 'Oracle Fusion health',
  })
  oracle() {
    return this.healthService.oracle();
  }
}