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
    {
      oracleId: 'SUP-004',
      supplierNumber: 'V0004',
      supplierName: 'PT Mitra Teknologi Nusantara',
      email: 'sales@mitrateknologi.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-005',
      supplierNumber: 'V0005',
      supplierName: 'PT Digital Integrasi Indonesia',
      email: 'contact@digitalintegrasi.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-006',
      supplierNumber: 'V0006',
      supplierName: 'PT Solusi Data Indonesia',
      email: 'info@solusidata.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-007',
      supplierNumber: 'V0007',
      supplierName: 'PT Sumber Daya Komputer',
      email: 'sales@sumberdayakomputer.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-008',
      supplierNumber: 'V0008',
      supplierName: 'PT Inovasi Sistem Digital',
      email: 'contact@inovasisistem.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-009',
      supplierNumber: 'V0009',
      supplierName: 'PT Prima Cloud Services',
      email: 'sales@primacloud.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-010',
      supplierNumber: 'V0010',
      supplierName: 'PT Cipta Infrastruktur Teknologi',
      email: 'info@ciptainfrastruktur.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-011',
      supplierNumber: 'V0011',
      supplierName: 'PT Nusantara Network Solutions',
      email: 'contact@nusantaranetwork.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-012',
      supplierNumber: 'V0012',
      supplierName: 'PT Integrasi Bisnis Digital',
      email: 'sales@integrasibisnis.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-013',
      supplierNumber: 'V0013',
      supplierName: 'PT Teknologi Mandiri Indonesia',
      email: 'info@teknologimandiri.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-014',
      supplierNumber: 'V0014',
      supplierName: 'PT Sentra Komputasi Indonesia',
      email: 'sales@sentrakomputasi.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-015',
      supplierNumber: 'V0015',
      supplierName: 'PT Data Center Nusantara',
      email: 'contact@datacenternusantara.co.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-016',
      supplierNumber: 'V0016',
      supplierName: 'PT Solusi Infrastruktur Digital',
      email: 'info@solusiinfrastruktur.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-017',
      supplierNumber: 'V0017',
      supplierName: 'PT Teknologi Enterprise Asia',
      email: 'sales@teknologi-enterprise.id',
      status: 'ACTIVE',
      syncedAt: new Date(),
    },
    {
      oracleId: 'SUP-018',
      supplierNumber: 'V0018',
      supplierName: 'PT Global Infrastruktur Solusi',
      email: 'contact@globalinfrastruktur.co.id',
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
