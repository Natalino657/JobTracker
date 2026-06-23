/*
  Warnings:

  - You are about to drop the column `note` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "note",
ADD COLUMN     "notes" TEXT;
