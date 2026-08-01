import { Injectable, Logger } from '@nestjs/common';

import { OracleEmployeeProvider } from '../../oracle/providers/oracle-employee.provider';
import { OracleEmployeeDto } from '../../oracle/dto/oracle-employee.dto';

@Injectable()
export class IncrementalSyncService {
  private readonly logger = new Logger(IncrementalSyncService.name);

  constructor(
    private readonly oracleEmployeeProvider: OracleEmployeeProvider,
  ) {}

  /**
   * Synchronize employees changed after the specified date.
   */
  async syncEmployees(lastSyncAt: Date): Promise<{
    processed: number;
    employees: OracleEmployeeDto[];
  }> {
    this.logger.log(
      `Starting employee incremental synchronization since ${lastSyncAt.toISOString()}`,
    );

    const collection =
      await this.oracleEmployeeProvider.findUpdatedSince(lastSyncAt);

    const employees = collection.items ?? [];

    this.logger.log(`Retrieved ${employees.length} employee(s) from Oracle.`);

    return {
      processed: employees.length,
      employees,
    };
  }

  /**
   * Synchronize all employees.
   */
  async syncAllEmployees(): Promise<{
    processed: number;
    employees: OracleEmployeeDto[];
  }> {
    this.logger.log('Starting full employee synchronization');

    const employees = await this.oracleEmployeeProvider.findAll();

    this.logger.log(`Retrieved ${employees.length} employee(s) from Oracle.`);

    return {
      processed: employees.length,
      employees,
    };
  }
}
