export default async function getSeriesOngoing(page = 1, limit = 10) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?status=ongoing&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
