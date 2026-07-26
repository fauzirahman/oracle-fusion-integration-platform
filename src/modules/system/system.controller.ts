import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('info')
  @ApiOperation({
    summary: 'Application Information',
  })
  getInfo() {
    return this.systemService.getInfo();
  }

  @Get('oracle/ping')
  @ApiOperation({
    summary: 'Check Oracle Fusion Connection',
  })
  pingOracle() {
    return this.systemService.pingOracle();
  }
}
