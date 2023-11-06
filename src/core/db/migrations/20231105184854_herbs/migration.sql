/*
  Warnings:

  - The primary key for the `I18n` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "I18n" DROP CONSTRAINT "I18n_pkey",
ALTER COLUMN "locale" SET DATA TYPE TEXT,
ADD CONSTRAINT "I18n_pkey" PRIMARY KEY ("locale");
