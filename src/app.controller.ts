import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      application: 'Oracle Fusion Integration Platform',
      version: '1.0.0',
      status: 'running',
      documentation: '/api',
      health: '/health',
    };
  }
}
