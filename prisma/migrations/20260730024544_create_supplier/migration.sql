/*
  Warnings:

  - You are about to drop the column `durationMs` on the `SyncLog` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `SyncLog` table. All the data in the column will be lost.
  - Added the required column `operation` to the `SyncLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `SyncLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('RUNNING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "SyncLog" DROP COLUMN "durationMs",
DROP COLUMN "errorMessage",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "entityId" TEXT,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "operation" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SyncStatus" NOT NULL;

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "oracleId" TEXT NOT NULL,
    "supplierNumber" TEXT,
    "supplierName" TEXT NOT NULL,
    "taxNumber" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_oracleId_key" ON "Supplier"("oracleId");
