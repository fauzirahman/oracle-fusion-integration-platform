import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OracleClientService } from '../oracle/client/oracle-client.service';

@Injectable()
export class SystemService {
  constructor(
    private readonly configService: ConfigService,
    private readonly oracleClient: OracleClientService,
  ) {}

  getInfo() {
    return {
      application: 'Oracle Fusion Integration Platform',
      version: '1.0.0',
      nodeEnv: this.configService.get('NODE_ENV'),
      port: this.configService.get('PORT'),
      timestamp: new Date().toISOString(),
    };
  }

  async pingOracle() {
    const startedAt = Date.now();

    try {
      const response = await this.oracleClient.get<any>(
        '/hcmRestApi/resources/latest/workers?limit=1',
      );

      return {
        success: true,
        message: 'Oracle Fusion connection successful',
        responseTime: `${Date.now() - startedAt} ms`,
        totalResults: response?.count ?? null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Oracle Fusion connection failed',
        responseTime: `${Date.now() - startedAt} ms`,
        error: error?.message,
      };
    }
  }
}
