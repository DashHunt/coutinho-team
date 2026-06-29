/*
  Warnings:

  - You are about to drop the column `data_cadastro` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `modificated_date` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modificated_date` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "data_cadastro",
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_date" TIMESTAMP(3),
ADD COLUMN     "modificated_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_date" TIMESTAMP(3),
ADD COLUMN     "modificated_date" TIMESTAMP(3) NOT NULL;
