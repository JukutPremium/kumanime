
export default async function getSeriesOngoing() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?status=ongoing`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
