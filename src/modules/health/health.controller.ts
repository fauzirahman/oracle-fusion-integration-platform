import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Check application health',
  })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
  })
  @Get()
  check() {
    return this.healthService.check();
  }
}
