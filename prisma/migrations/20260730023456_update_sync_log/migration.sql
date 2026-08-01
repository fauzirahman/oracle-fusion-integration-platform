/*
  Warnings:

  - You are about to drop the column `action` on the `SyncLog` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `SyncLog` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `SyncLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SyncLog" DROP COLUMN "action",
DROP COLUMN "entityId",
DROP COLUMN "message",
ADD COLUMN     "durationMs" INTEGER,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "totalRecords" INTEGER NOT NULL DEFAULT 0;
