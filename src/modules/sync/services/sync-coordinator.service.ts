import { Injectable, Logger } from '@nestjs/common';

import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { EmployeeSyncService } from './employee-sync.service';
import { DepartmentSyncService } from './department-sync.service';
import { SupplierSyncService } from './supplier-sync.service';

@Injectable()
export class SyncCoordinatorService {
  private readonly logger = new Logger(
    SyncCoordinatorService.name,
  );

  constructor(
    private readonly employeeSyncService: EmployeeSyncService,
    private readonly departmentSyncService: DepartmentSyncService,
    private readonly supplierSyncService: SupplierSyncService,
  ) {}

  async syncEmployees(): Promise<SyncSummaryDto> {
    return this.employeeSyncService.sync();
  }

  async syncDepartments(): Promise<SyncSummaryDto> {
    return this.departmentSyncService.sync();
  }

  async syncSuppliers(): Promise<SyncSummaryDto> {
    return this.supplierSyncService.sync();
  }

  /**
   * Run synchronization sequentially.
   *
   * Department → Employee → Supplier
   *
   * Department biasanya menjadi referensi
   * untuk Employee.
   */
  async syncAllSequential(): Promise<void> {
    this.logger.log('Starting sequential synchronization');

    await this.departmentSyncService.sync();

    await this.employeeSyncService.sync();

    await this.supplierSyncService.sync();

    this.logger.log('Sequential synchronization completed');
  }

  /**
   * Run synchronization in parallel.
   *
   * Gunakan jika tidak ada dependency antar entity.
   */
  async syncAllParallel(): Promise<void> {
    this.logger.log('Starting parallel synchronization');

    await Promise.all([
      this.employeeSyncService.sync(),
      this.departmentSyncService.sync(),
      this.supplierSyncService.sync(),
    ]);

    this.logger.log('Parallel synchronization completed');
  }
}