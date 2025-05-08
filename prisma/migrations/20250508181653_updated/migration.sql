/*
  Warnings:

  - You are about to drop the column `accountId` on the `ServicePlan` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ServicePlan_accountId_key";

-- AlterTable
ALTER TABLE "ServicePlan" DROP COLUMN "accountId";
