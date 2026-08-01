import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SyncCoordinatorService } from '../services/sync-coordinator.service';

@ApiTags('Synchronization')
@Controller('sync')
export class SyncController {
  constructor(private readonly coordinator: SyncCoordinatorService) {}

  @Post('employees')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Incremental employee synchronization',
  })
  syncEmployees() {
    return this.coordinator.syncEmployees();
  }

  @Post('departments')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Incremental department synchronization',
  })
  syncDepartments() {
    return this.coordinator.syncDepartments();
  }

  @Post('suppliers')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Incremental supplier synchronization',
  })
  syncSuppliers() {
    return this.coordinator.syncSuppliers();
  }

  @Post('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Synchronize all Oracle Fusion master data',
  })
  syncAll() {
    return this.coordinator.syncAllSequential();
  }
}
