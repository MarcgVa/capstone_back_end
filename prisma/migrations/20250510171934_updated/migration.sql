/*
  Warnings:

  - You are about to drop the column `cutDate` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "cutDate";

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "cutDate" DATE;
