-- CreateTable
CREATE TABLE "I18n" (
    "locale" VARCHAR(2) NOT NULL,
    "messages" JSONB NOT NULL,

    CONSTRAINT "I18n_pkey" PRIMARY KEY ("locale")
);
