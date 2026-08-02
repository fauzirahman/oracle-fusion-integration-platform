import { PrismaClient } from '@prisma/client';

export async function seedSuppliers(prisma: PrismaClient) {
  const suppliers = [
    {
      oracleId: 'SUP-001',
      supplierNumber: 'V0001',
      supplierName: 'PT Oracle Technology Indonesia',
      email: 'contact@oracle-tech.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-002',
      supplierNumber: 'V0002',
      supplierName: 'PT Global Software Solution',
      email: 'sales@gss.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-003',
      supplierNumber: 'V0003',
      supplierName: 'PT Enterprise Hardware',
      email: 'info@enterprise-hardware.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: {
        oracleId: supplier.oracleId,
      },
      update: supplier,
      create: supplier,
    });
  }

  console.log(`Supplier seeded: ${suppliers.length}`);
}
