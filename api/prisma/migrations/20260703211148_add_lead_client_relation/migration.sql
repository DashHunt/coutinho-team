-- AlterTable
ALTER TABLE "Client" ADD COLUMN "lead_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Client_lead_id_key" ON "Client"("lead_id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
