import { PrismaClient } from '@prisma/client';

export async function seedEmployees(prisma: PrismaClient) {
  const employees = [
    {
      oracleId: 'EMP-001',
      employeeNumber: '10001',
      firstName: 'John',
      lastName: 'Smith',
      displayName: 'John Smith',
      email: 'john.smith@example.com',
      status: 'ACTIVE',
      departmentId: '100',
    },
    {
      oracleId: 'EMP-002',
      employeeNumber: '10002',
      firstName: 'Sarah',
      lastName: 'Wilson',
      displayName: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      status: 'ACTIVE',
      departmentId: '200',
    },
    {
      oracleId: 'EMP-003',
      employeeNumber: '10003',
      firstName: 'Michael',
      lastName: 'Brown',
      displayName: 'Michael Brown',
      email: 'michael.brown@example.com',
      status: 'ACTIVE',
      departmentId: '300',
    },
  ];

  for (const employee of employees) {
    const department = await prisma.department.findUnique({
      where: {
        oracleId: employee.departmentId,
      },
    });

    if (!department) {
      continue;
    }

    await prisma.employee.upsert({
      where: {
        oracleId: employee.oracleId,
      },

      update: {
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        lastName: employee.lastName,
        displayName: employee.displayName,
        email: employee.email,
        departmentId: department.id,
      },

      create: {
        oracleId: employee.oracleId,
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        lastName: employee.lastName,
        displayName: employee.displayName,
        email: employee.email,
        status: employee.status,
        departmentId: department.id,
      },
    });
  }

  console.log(`Employee seeded: ${employees.length}`);
}
