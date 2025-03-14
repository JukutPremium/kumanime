const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Daftar URL video server
const videoServers = [
  "https://short.icu/dydG34WTX",
  "https://short.icu/44VYoz7uc",
  "https://instinkserver.blogspot.com/?player=video&provider=gdrive&format=video%2Fmp4&link=1gAy-FdWzGD6sUx92Gcd5sp4m4xXVzgwc",
];

// Daftar hari untuk scheduleDay
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Fungsi untuk menghasilkan karakter acak (0-9 atau a-z)
function getRandomCharacter() {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  return characters[Math.floor(Math.random() * characters.length)];
}

// Fungsi untuk menghasilkan data Series secara acak
async function generateRandomSeries(index) {
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
  ];
  const randomGenres = genres.sort(() => Math.random() - 0.5).slice(0, 3); // Ambil 3 genre secara acak

  // Generate random prefix (0-9 atau a-z)
  const randomPrefix = getRandomCharacter();

  return {
    slug: `${randomPrefix}-series-${index}-${Date.now()}`, // Pastikan slug unik
    title: `${randomPrefix.toUpperCase()} Series Title ${index}`,
    banner: `https://picsum.photos/id/${index}/600/800`, // Ambil gambar acak dari API
    synopsis: `This is the synopsis for Series ${index}.`,
    status: index % 2 === 0 ? "ongoing" : "completed",
    studio: `Studio ${index}`,
    season: `Season ${index}`,
    type: index % 2 === 0 ? "TV" : "Movie",
    preview: `https://www.youtube.com/watch?v=h2RYiyI9Sdg`, // URL YouTube
    scheduleDay: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)], // Pilih hari secara acak
    genre: randomGenres,
    censor: index % 4 === 0, // 25% series akan memiliki censor true
    deleted: false,
  };
}

// Fungsi untuk menghasilkan data Episode secara acak
function generateRandomEpisodes(seriesId, episodeCount) {
  const episodes = [];
  for (let i = 1; i <= episodeCount; i++) {
    // Pilih 1-3 URL video server secara acak
    const randomVideoServers = videoServers
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    episodes.push({
      slug: `series-${seriesId}-episode-${i}-${Date.now()}`, // Pastikan slug unik
      order: i,
      videoServer: randomVideoServers,
      seriesId: seriesId,
      deleted: false,
    });
  }
  return episodes;
}

async function main() {
  // Hapus semua data sebelumnya (opsional)
  await prisma.series.deleteMany();
  await prisma.episode.deleteMany();

  const totalSeries = 100; // Jumlah Series yang ingin dibuat
  const episodesPerSeries = 10; // Jumlah Episode per Series

  for (let i = 1; i <= totalSeries; i++) {
    // Buat Series
    const series = await prisma.series.create({
      data: await generateRandomSeries(i),
    });

    // Buat Episode untuk Series tersebut
    await prisma.episode.createMany({
      data: generateRandomEpisodes(series.id, episodesPerSeries),
    });

    console.log(`Created Series ${i} with ${episodesPerSeries} episodes.`);
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
