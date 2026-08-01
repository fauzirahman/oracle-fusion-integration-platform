import { Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';

import { PrismaService } from '../../../database';
import { PrismaRepository } from '../../../common/repositories/prisma.repository';
import { SyncUpsertRepository } from '../../../common/sync/sync-upsert.repository';

@Injectable()
export class EmployeeRepository
  extends PrismaRepository
  implements SyncUpsertRepository<Prisma.EmployeeCreateInput>
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany({
      orderBy: {
        displayName: 'asc',
      },
    });
  }

  async findById(id: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async findByOracleId(
    oracleId: string,
  ): Promise<Prisma.EmployeeCreateInput | null> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        oracleId,
      },
    });

    if (!employee) {
      return null;
    }

    return {
      oracleId: employee.oracleId,
      employeeNumber: employee.employeeNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      displayName: employee.displayName,
      email: employee.email,
      department: undefined,
      jobTitle: employee.jobTitle,
      status: employee.status,
      syncedAt: employee.syncedAt,
    };
  }

  async exists(oracleId: string): Promise<boolean> {
    return (
      (await this.prisma.employee.count({
        where: {
          oracleId,
        },
      })) > 0
    );
  }

  async count(): Promise<number> {
    return this.prisma.employee.count();
  }

  async create(
    data: Prisma.EmployeeCreateInput,
  ): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: {
        id,
      },
      data,
    });
  }

  async upsert(
    data: Prisma.EmployeeCreateInput,
  ): Promise<Prisma.EmployeeCreateInput> {
    const employee = await this.prisma.employee.upsert({
      where: {
        oracleId: data.oracleId,
      },
      create: data,
      update: {
        employeeNumber: data.employeeNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
        email: data.email,
        jobTitle: data.jobTitle,
        status: data.status,
        syncedAt: new Date(),
      },
    });

    return {
      oracleId: employee.oracleId,
      employeeNumber: employee.employeeNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      displayName: employee.displayName,
      email: employee.email,
      department: undefined,
      jobTitle: employee.jobTitle,
      status: employee.status,
      syncedAt: employee.syncedAt,
    };
  }

  async delete(id: string): Promise<Employee> {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}