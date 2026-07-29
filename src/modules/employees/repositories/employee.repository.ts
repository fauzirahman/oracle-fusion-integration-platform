import { Injectable } from '@nestjs/common';
import { Prisma, Employee } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany({
      orderBy: {
        displayName: 'asc',
      },
    });
  }

  async findByOracleId(oracleId: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        oracleId,
      },
    });
  }

  async upsert(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return this.prisma.employee.upsert({
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
  }

  async delete(id: string): Promise<Employee> {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
