export default async function getSeriesAnimeList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?page=animelist&limit=999999999`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
