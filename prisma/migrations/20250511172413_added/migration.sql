-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Message', 'Task', 'Request');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('URGENT', 'HIGH', 'NORMAL', 'LOW');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Message',
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NORMAL';
