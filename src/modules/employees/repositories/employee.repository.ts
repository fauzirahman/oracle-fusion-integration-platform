import { Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
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

  async findById(id: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }

  async findByOracleId(oracleId: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        oracleId,
      },
    });
  }

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.EmployeeUpdateInput,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data,
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
      where: { id },
    });
  }
}
