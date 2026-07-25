import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SystemService {
  constructor(private readonly configService: ConfigService) {}

  getInfo() {
    return {
      application: 'Oracle Fusion Integration Platform',
      version: '1.0.0',
      nodeEnv: this.configService.get('NODE_ENV'),
      port: this.configService.get('PORT'),
      timestamp: new Date().toISOString(),
    };
  }
}
