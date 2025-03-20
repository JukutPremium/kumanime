import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

// Fungsi untuk membaca file JSON
function readJSONFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

async function seedFromJSON() {
  try {
    // Baca data dari JSON
    const seriesData = readJSONFile("seriesData.json");

    // Hapus data lama (opsional)
    await prisma.episode.deleteMany();
    await prisma.series.deleteMany();

    for (const series of seriesData) {
      // Insert Series
      const createdSeries = await prisma.series.create({
        data: {
          slug: series.slug,
          title: series.title,
          banner: series.banner,
          synopsis: series.synopsis,
          status: series.status,
          studio: series.studio,
          season: series.season,
          type: series.type,
          preview: series.preview,
          scheduleDay: series.scheduleDay,
          genre: series.genre,
          censor: series.censor,
          deleted: series.deleted,
        },
      });

      // Insert Episodes
      if (series.episodes && series.episodes.length > 0) {
        const episodeData = series.episodes.map((episode) => ({
          slug: episode.slug,
          order: episode.order,
          videoServer: episode.videoServer,
          seriesId: createdSeries.id,
          deleted: episode.deleted,
        }));

        await prisma.episode.createMany({ data: episodeData });
      }

      console.log(`Inserted Series: ${series.title}`);
    }

    console.log("JSON seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding JSON data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Jalankan seeding
seedFromJSON();
