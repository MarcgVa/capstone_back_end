/*
  Warnings:

  - A unique constraint covering the columns `[scheduledTech]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "scheduledTech" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Services_scheduledTech_key" ON "Services"("scheduledTech");
