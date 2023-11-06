-- CreateTable
CREATE TABLE "Herb" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "photo" TEXT,
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" INTEGER NOT NULL,

    CONSTRAINT "Herb_pkey" PRIMARY KEY ("id")
);
