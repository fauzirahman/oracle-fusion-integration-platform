/*
  Warnings:

  - A unique constraint covering the columns `[supplierNumber]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Made the column `syncedAt` on table `Supplier` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "syncedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "SyncCheckpoint" ADD COLUMN     "lastSuccessAt" TIMESTAMP(3),
ALTER COLUMN "lastSyncAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SyncHistory" (
    "id" TEXT NOT NULL,
    "jobName" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,
    "status" "SyncStatus" NOT NULL,
    "total" INTEGER NOT NULL,
    "inserted" INTEGER NOT NULL,
    "updated" INTEGER NOT NULL,
    "failed" INTEGER NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SyncHistory_jobName_idx" ON "SyncHistory"("jobName");

-- CreateIndex
CREATE INDEX "SyncHistory_startedAt_idx" ON "SyncHistory"("startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplierNumber_key" ON "Supplier"("supplierNumber");
