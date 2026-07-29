import { Injectable, Logger } from '@nestjs/common';

import { OracleEmployeeService } from '../../oracle/services/oracle-employee.service';
import { EmployeeRepository } from '../../employees/repositories/employee.repository';

@Injectable()
export class EmployeeSyncService {
  private readonly logger = new Logger(EmployeeSyncService.name);

  constructor(
    private readonly oracleEmployeeService: OracleEmployeeService,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async sync(): Promise<number> {
    this.logger.log('Starting employee synchronization...');

    const response = await this.oracleEmployeeService.find({
      limit: 500,
    });

    const employees = response.items ?? [];

    for (const employee of employees) {
      await this.employeeRepository.upsert({
        oracleId: String(employee.PersonId),
        employeeNumber: employee.PersonNumber,
        firstName: employee.FirstName ?? '',
        lastName: employee.LastName ?? '',
        displayName: employee.DisplayName,
        email: employee.WorkEmail ?? null,
        jobTitle: employee.JobName ?? null,
        status: 'ACTIVE',
        syncedAt: new Date(),
      });
    }

    this.logger.log(
      `Employee synchronization completed (${employees.length} records).`,
    );

    return employees.length;
  }
}