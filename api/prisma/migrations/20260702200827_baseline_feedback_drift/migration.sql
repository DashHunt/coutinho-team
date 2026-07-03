-- Baseline migration: registers schema objects that already exist in the database
-- (created previously via `prisma db push` for the Feedback feature, never captured
-- by a tracked migration). This migration is marked as already applied via
-- `prisma migrate resolve --applied` and its SQL is not executed against the
-- existing dev database — it exists so a fresh database (e.g. a new environment)
-- ends up with the same schema.

-- CreateEnum
CREATE TYPE "FeedbackOptions" AS ENUM ('PROMOTOR', 'PASSIVO', 'DETRATOR');

-- CreateTable
CREATE TABLE "ClientFeedback" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "feedback_nps" "FeedbackOptions" NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" TIMESTAMP(3),
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientInfo_client_id_key" ON "ClientInfo"("client_id");

-- AddForeignKey
ALTER TABLE "ClientFeedback" ADD CONSTRAINT "ClientFeedback_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
