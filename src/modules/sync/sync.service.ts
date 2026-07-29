import { Injectable } from '@nestjs/common';

import { EmployeeSyncService } from './services/employee-sync.service';
import { DepartmentSyncService } from './services/department-sync.service';

@Injectable()
export class SyncService {
  constructor(
    private readonly employeeSyncService: EmployeeSyncService,
    private readonly departmentSyncService: DepartmentSyncService,
  ) {}

  async syncEmployees() {
    const total = await this.employeeSyncService.sync();

    return {
      entity: 'employees',
      synchronized: total,
    };
  }

  async syncDepartments() {
    const total = await this.departmentSyncService.sync();

    return {
      entity: 'departments',
      synchronized: total,
    };
  }
}