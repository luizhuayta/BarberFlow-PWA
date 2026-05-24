/*
  Warnings:

  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#f59e0b',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
