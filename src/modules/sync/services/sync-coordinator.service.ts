import { Injectable, Logger } from '@nestjs/common';

import { DatabaseLockService } from '../../../database/database-lock.service';

import { SyncSummaryDto } from '../dto/sync-summary.dto';

import { DepartmentSyncService } from './department-sync.service';
import { EmployeeSyncService } from './employee-sync.service';
import { SupplierSyncService } from './supplier-sync.service';

@Injectable()
export class SyncCoordinatorService {
  private readonly logger = new Logger(SyncCoordinatorService.name);

  constructor(
    private readonly lockService: DatabaseLockService,

    private readonly employeeSyncService: EmployeeSyncService,

    private readonly departmentSyncService: DepartmentSyncService,

    private readonly supplierSyncService: SupplierSyncService,
  ) {}

  async syncEmployees(): Promise<SyncSummaryDto> {
    return this.lockService.executeWithLock('employee-sync', async () => {
      this.logger.log('Employee synchronization started');

      const result = await this.employeeSyncService.sync();

      this.logger.log('Employee synchronization completed');

      return result;
    });
  }

  async syncDepartments(): Promise<SyncSummaryDto> {
    return this.lockService.executeWithLock('department-sync', async () => {
      this.logger.log('Department synchronization started');

      const result = await this.departmentSyncService.sync();

      this.logger.log('Department synchronization completed');

      return result;
    });
  }

  async syncSuppliers(): Promise<SyncSummaryDto> {
    return this.lockService.executeWithLock('supplier-sync', async () => {
      this.logger.log('Supplier synchronization started');

      const result = await this.supplierSyncService.sync();

      this.logger.log('Supplier synchronization completed');

      return result;
    });
  }

  /**
   * Sequential synchronization.
   *
   * Department
   * ↓
   * Employee
   * ↓
   * Supplier
   */
  async syncAllSequential(): Promise<void> {
    await this.lockService.executeWithLock('full-sync', async () => {
      this.logger.log('Sequential synchronization started');

      await this.departmentSyncService.sync();

      await this.employeeSyncService.sync();

      await this.supplierSyncService.sync();

      this.logger.log('Sequential synchronization completed');
    });
  }

  /**
   * Parallel synchronization.
   *
   * Gunakan hanya jika entity
   * tidak saling bergantung.
   */
  async syncAllParallel(): Promise<void> {
    await this.lockService.executeWithLock('full-sync', async () => {
      this.logger.log('Parallel synchronization started');

      await Promise.all([
        this.employeeSyncService.sync(),
        this.departmentSyncService.sync(),
        this.supplierSyncService.sync(),
      ]);

      this.logger.log('Parallel synchronization completed');
    });
  }
}
