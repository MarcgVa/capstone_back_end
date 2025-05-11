/*
  Warnings:

  - A unique constraint covering the columns `[accountId,servicePlanId]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Services_accountId_servicePlanId_key" ON "Services"("accountId", "servicePlanId");
