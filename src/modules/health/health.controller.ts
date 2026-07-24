import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'UP',
      service: 'Oracle Fusion Integration Platform',
      timestamp: new Date(),
    };
  }
}