/*
  Warnings:

  - You are about to drop the column `billCycle` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `servicePlan` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoices` on the `Invoice` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `billing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consultations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstName,lastName,phone]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicePlanId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - The required column `invoiceId` was added to the `Invoice` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "billing" DROP CONSTRAINT "billing_accountId_fkey";

-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "billCycle",
DROP COLUMN "servicePlan",
ADD COLUMN     "address" VARCHAR(100) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "servicePlanId" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
DROP COLUMN "id",
DROP COLUMN "invoices",
ADD COLUMN     "invoice" XML NOT NULL,
ADD COLUMN     "invoiceId" TEXT NOT NULL,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "billing";

-- DropTable
DROP TABLE "consultations";

-- DropTable
DROP TABLE "todos";

-- CreateTable
CREATE TABLE "ServicePlan" (
    "servicePlanId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "cycle" INTEGER NOT NULL,

    CONSTRAINT "ServicePlan_pkey" PRIMARY KEY ("servicePlanId")
);

-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" SERIAL NOT NULL,
    "billToId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "billCycle" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicePlan_title_key" ON "ServicePlan"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Consultations_email_key" ON "Consultations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_phone_key" ON "Account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Account_firstName_lastName_phone_key" ON "Account"("firstName", "lastName", "phone");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_servicePlanId_fkey" FOREIGN KEY ("servicePlanId") REFERENCES "ServicePlan"("servicePlanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_billToId_fkey" FOREIGN KEY ("billToId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;
