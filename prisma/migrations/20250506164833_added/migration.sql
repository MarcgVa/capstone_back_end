-- CreateTable
CREATE TABLE "maintenance" (
    "id" SERIAL NOT NULL,
    "item" VARCHAR(50) NOT NULL,
    "cycle" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);
