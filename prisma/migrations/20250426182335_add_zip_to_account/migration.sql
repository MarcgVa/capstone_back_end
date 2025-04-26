/*
  Warnings:

  - Added the required column `zip` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "zip" INTEGER NOT NULL,
ALTER COLUMN "cutDate" DROP NOT NULL;
