/*
  Warnings:

  - You are about to drop the column `postedBy` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `releadted` on the `Series` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "postedBy",
DROP COLUMN "rating",
DROP COLUMN "releadted";
