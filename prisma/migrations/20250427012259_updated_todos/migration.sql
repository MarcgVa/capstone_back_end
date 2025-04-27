/*
  Warnings:

  - You are about to drop the column `userId` on the `Todos` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_userId_fkey";

-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "userId",
ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
