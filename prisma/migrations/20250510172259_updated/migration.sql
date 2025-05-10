/*
  Warnings:

  - You are about to drop the column `cutDate` on the `Services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "cutDate",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "scheduledDate" DATE;
