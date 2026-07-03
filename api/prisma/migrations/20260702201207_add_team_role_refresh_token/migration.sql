/*
  Warnings:

  - Added the required column `team_id` to the `Users` table without a default value.
    Since the table already has rows, this migration creates a default Team first,
    backfills every existing user into it, and only then makes the column required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COACH');

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" TIMESTAMP(3),
    "modificated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- Seed default team so existing users can be backfilled below
INSERT INTO "Team" ("name", "modificated_date") VALUES ('Coutinho Team', CURRENT_TIMESTAMP);

-- AlterTable: role gets a default, so it's safe on a non-empty table
ALTER TABLE "Users" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'COACH';

-- AlterTable: team_id starts nullable so existing rows can be backfilled
ALTER TABLE "Users" ADD COLUMN "team_id" INTEGER;

-- Backfill existing users into the default team
UPDATE "Users" SET "team_id" = (SELECT "id" FROM "Team" ORDER BY "id" ASC LIMIT 1) WHERE "team_id" IS NULL;

-- Now that every row has a team_id, the column can become required
ALTER TABLE "Users" ALTER COLUMN "team_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token_hash" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_hash_key" ON "RefreshToken"("token_hash");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
