export default async function getSeries(limit = 10) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
