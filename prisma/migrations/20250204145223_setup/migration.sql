-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "releadted" TEXT,
    "censor" BOOLEAN NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "releasedOn" TIMESTAMP(3) NOT NULL,
    "studio" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "preview" TEXT,
    "postedBy" TEXT NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "genre" TEXT[],

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "releasedOn" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoServer" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "VideoServer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_slug_key" ON "Series"("slug");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoServer" ADD CONSTRAINT "VideoServer_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
