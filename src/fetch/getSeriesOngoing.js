export default async function getSeriesOngoing(page = 1, limit = 999999999) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?status=ongoing&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
