/*
  Warnings:

  - The primary key for the `Herb` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Herb` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Herb_name_key";

-- AlterTable
ALTER TABLE "Herb" DROP CONSTRAINT "Herb_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Herb_pkey" PRIMARY KEY ("name");
