import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private readonly databaseRequired: boolean;

  constructor(private readonly configService: ConfigService) {
    super();

    this.databaseRequired =
      this.configService.get<boolean>('DATABASE_REQUIRED') ?? true;
  }

  async onModuleInit() {
    if (!this.databaseRequired) {
      this.logger.log(
        'Database connection disabled because DATABASE_REQUIRED=false',
      );

      return;
    }

    await this.$connect();

    this.logger.log('Database connection established');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  async onModuleDestroy() {
    if (!this.databaseRequired) {
      return;
    }

    await this.$disconnect();
  }
}
