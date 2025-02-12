/*
  Warnings:

  - You are about to drop the `VideoServer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VideoServer" DROP CONSTRAINT "VideoServer_episodeId_fkey";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "videoServer" TEXT[];

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "scheduleDay" TEXT;

-- DropTable
DROP TABLE "VideoServer";
