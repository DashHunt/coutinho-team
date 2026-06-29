/*
  Warnings:

  - You are about to drop the column `historico` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `name` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone_number` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "historico",
DROP COLUMN "nome",
DROP COLUMN "telefone",
ADD COLUMN     "history" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "telephone_number" TEXT NOT NULL;
