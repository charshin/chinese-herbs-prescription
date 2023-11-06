/*
  Warnings:

  - Added the required column `displayedIn` to the `Herb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Herb" ADD COLUMN     "displayedIn" JSONB NOT NULL;
