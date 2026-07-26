import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OracleAuthService } from './auth/oracle-auth.service';
import { OracleClientService } from './client/oracle-client.service';
@Module({
  imports: [HttpModule],
  providers: [OracleAuthService, OracleClientService],
  exports: [OracleClientService],
})
export class OracleModule {}