import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Department[]> {
    return this.prisma.department.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: {
        id,
      },
    });
  }

  async findByOracleId(oracleId: string): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: {
        oracleId,
      },
    });
  }

  async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
    return this.prisma.department.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.DepartmentUpdateInput,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: {
        id,
      },
      data,
    });
  }

  async upsert(data: Prisma.DepartmentCreateInput): Promise<Department> {
    return this.prisma.department.upsert({
      where: {
        oracleId: data.oracleId,
      },
      create: data,
      update: {
        name: data.name,
        code: data.code,
        managerId: data.managerId,
      },
    });
  }

  async delete(id: string): Promise<Department> {
    return this.prisma.department.delete({
      where: {
        id,
      },
    });
  }
}
