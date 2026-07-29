import { Injectable, Logger } from '@nestjs/common';
import { OracleDepartmentProvider } from '../../departements/providers/oracle-department.provider';
import { DepartmentRepository } from '../../departements/repositories/department.repository';
@Injectable()
export class DepartmentSyncService {
  private readonly logger = new Logger(DepartmentSyncService.name);

  constructor(
    private readonly oracleProvider: OracleDepartmentProvider,
    private readonly repository: DepartmentRepository,
  ) {}

  async sync(): Promise<number> {
    const departments = await this.oracleProvider.findAll();

    this.logger.log(`Found ${departments.length} departments from Oracle`);

    for (const item of departments) {
      await this.repository.upsert({
        oracleId: String(item.OrganizationId),

        name: item.Name,

        code: item.OrganizationCode ?? null,

        managerId: item.ManagerId ? String(item.ManagerId) : null,
      });
    }

    this.logger.log(`Synchronized ${departments.length} departments`);

    return departments.length;
  }
}
