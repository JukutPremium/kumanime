import getSeries from "@/fetch/getSeries";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const currentDate = new Date();

  const staticRoutes = [
    "",
    "/sign-out",
    "/sign-in",
    "/dashboard",
    "/animelist",
    "/completed",
    "/ongoing",
    "/schedule",
    "/search",
    "/watchlist",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.9,
  }));

  // Ambil daftar series
  const series = await getSeries(999999999);

  const seriesPages = series.data.map((s) => ({
    url: `${baseUrl}/series/${s.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Ambil daftar episode berdasarkan slug series
  let episodePages = [];

  for (const s of series.data) {
    const seriesData = await getSeriesBySlug(s.slug); // Ambil data lengkap series, termasuk episode
    if (seriesData.data) {
      episodePages.push(
        ...seriesData.data.episodes.map((e) => ({
          url: `${baseUrl}/episode/${e.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.7,
        })),
      );
    }
  }

  return [...staticPages, ...seriesPages, ...episodePages];
}
