/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ATIVO', 'INATIVO', 'EM_RENOVACAO');

-- CreateEnum
CREATE TYPE "EventLevel" AS ENUM ('ESTADUAL', 'NACIONAL', 'INTERNACIONAL');

-- CreateEnum
CREATE TYPE "EventAchievement" AS ENUM ('OURO', 'PRATA', 'BRONZE', 'RECORDE', 'PARTICIPACAO');

-- CreateTable
CREATE TABLE "Plans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "monthly_value" INTEGER NOT NULL,
    "total_value" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" TIMESTAMP(3),
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "telephone_number" TEXT NOT NULL,
    "document" TEXT,
    "objectives" TEXT,
    "history" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" TIMESTAMP(3),
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientPlanHistory" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "purchased_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "status" "PlanStatus" NOT NULL DEFAULT 'ATIVO',
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientPlanHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientInfo" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "block" TEXT NOT NULL,
    "block_week" TEXT NOT NULL,
    "previous_block" TEXT DEFAULT 'No block registered',
    "notes" TEXT,
    "sheet_link" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" TIMESTAMP(3),
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAchievements" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "event_level" "EventLevel" NOT NULL,
    "event_achievement" "EventAchievement" NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" TIMESTAMP(3),
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientAchievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "ClientPlanHistory" ADD CONSTRAINT "ClientPlanHistory_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPlanHistory" ADD CONSTRAINT "ClientPlanHistory_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientInfo" ADD CONSTRAINT "ClientInfo_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAchievements" ADD CONSTRAINT "ClientAchievements_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
