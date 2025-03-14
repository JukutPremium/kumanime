export default async function getSeriesCompleted(page = 1, limit = 999999999) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?status=completed&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
