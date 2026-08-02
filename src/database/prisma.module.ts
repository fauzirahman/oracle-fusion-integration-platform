import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { DatabaseLockService } from './database-lock.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseLockService],

  exports: [PrismaService, DatabaseLockService],
})
export class PrismaModule {}
