/*
  Warnings:

  - You are about to drop the column `servicePlanId` on the `Services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_servicePlanId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "servicePlanId";
