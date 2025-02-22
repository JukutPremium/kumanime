export default async function getSeries() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
