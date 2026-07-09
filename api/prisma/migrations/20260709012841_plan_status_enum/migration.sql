-- CreateEnum
CREATE TYPE "PlanAvailability" AS ENUM ('ATIVO', 'INATIVO');

-- AlterTable: convert Plans.status from free text to PlanAvailability,
-- defaulting any value that doesn't match the enum to 'ATIVO'
ALTER TABLE "Plans" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Plans" ALTER COLUMN "status" TYPE "PlanAvailability" USING (
  CASE
    WHEN UPPER("status") IN ('ATIVO', 'INATIVO') THEN UPPER("status")::"PlanAvailability"
    ELSE 'ATIVO'::"PlanAvailability"
  END
);
ALTER TABLE "Plans" ALTER COLUMN "status" SET DEFAULT 'ATIVO';
