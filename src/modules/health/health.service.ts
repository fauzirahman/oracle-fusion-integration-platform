import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { OracleClientService } from '../oracle/client/oracle-client.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly oracleClient: OracleClientService,
  ) {}

  async health() {
    const [database, oracle] = await Promise.all([
      this.database(),
      this.oracle(),
    ]);

    return {
      status:
        database.status === 'UP' && oracle.status === 'UP' ? 'UP' : 'DOWN',

      timestamp: new Date().toISOString(),

      database,

      oracle,
    };
  }

  async database() {
    const startedAt = Date.now();

    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'UP',
        responseTime: Date.now() - startedAt,
      };
    } catch (error) {
      return {
        status: 'DOWN',
        responseTime: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async oracle() {
    const startedAt = Date.now();

    try {
      await this.oracleClient.get(
        '/hcmRestApi/resources/latest/workers?limit=1&onlyData=true',
      );

      return {
        status: 'UP',
        responseTime: Date.now() - startedAt,
      };
    } catch (error) {
      return {
        status: 'DOWN',
        responseTime: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
