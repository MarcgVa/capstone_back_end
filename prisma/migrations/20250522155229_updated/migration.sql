/*
  Warnings:

  - You are about to drop the column `Item` on the `Billing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "Item",
ADD COLUMN     "item" TEXT;
