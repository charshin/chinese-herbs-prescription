/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Herb` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Herb_name_key" ON "Herb"("name");
