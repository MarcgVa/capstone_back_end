/*
  Warnings:

  - A unique constraint covering the columns `[accountId,code]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Services_accountId_code_key" ON "Services"("accountId", "code");
