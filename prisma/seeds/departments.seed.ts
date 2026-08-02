import { PrismaClient } from '@prisma/client';

export async function seedDepartments(prisma: PrismaClient) {
  const departments = [
    {
      oracleId: '100',
      code: 'IT',
      name: 'Information Technology',
    },
    {
      oracleId: '200',
      code: 'FIN',
      name: 'Finance',
    },
    {
      oracleId: '300',
      code: 'HR',
      name: 'Human Resources',
    },
    {
      oracleId: '400',
      code: 'PROC',
      name: 'Procurement',
    },
  ];

  for (const department of departments) {
    await prisma.department.upsert({
      where: {
        oracleId: department.oracleId,
      },
      update: department,
      create: department,
    });
  }

  console.log(`Department seeded: ${departments.length}`);
}
