/*
  Warnings:

  - You are about to drop the column `servicePlanId` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `ServicePlan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_servicePlanId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "servicePlanId";

-- AlterTable
ALTER TABLE "ServicePlan" ADD COLUMN     "accountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ServicePlan_accountId_key" ON "ServicePlan"("accountId");
