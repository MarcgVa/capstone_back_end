/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Services` table. All the data in the column will be lost.
  - Added the required column `servicePlanId` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_serviceId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "serviceId",
ADD COLUMN     "servicePlanId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_servicePlanId_fkey" FOREIGN KEY ("servicePlanId") REFERENCES "ServicePlan"("servicePlanId") ON DELETE RESTRICT ON UPDATE CASCADE;
