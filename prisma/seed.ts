import { PrismaClient } from '@prisma/client';

import { seedDepartments } from './seeds/departments.seed';
import { seedSuppliers } from './seeds/suppliers.seed';
import { seedEmployees } from './seeds/employees.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  await seedDepartments(prisma);

  await seedSuppliers(prisma);

  await seedEmployees(prisma);

  console.log('✅ Database seed completed');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
