import { Module } from '@nestjs/common';

import { OracleModule } from '../oracle/oracle.module';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  imports: [OracleModule],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
