-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ServicePlan"("servicePlanId") ON DELETE RESTRICT ON UPDATE CASCADE;
