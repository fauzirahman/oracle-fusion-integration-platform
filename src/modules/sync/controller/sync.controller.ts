import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SyncService } from '../sync.service';

@ApiTags('Synchronization')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('employees')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Synchronize employees from Oracle Fusion',
  })
  async syncEmployees() {
    return this.syncService.syncEmployees();
  }

  @Post('departments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Synchronize departments from Oracle Fusion',
  })
  async syncDepartments() {
    return this.syncService.syncDepartments();
  }
}
