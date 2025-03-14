export default async function getSeriesSchedule() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?page=schedule&limit=999999999`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
