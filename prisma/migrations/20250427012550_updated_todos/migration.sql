/*
  Warnings:

  - Added the required column `title` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "title" VARCHAR(50) NOT NULL;
