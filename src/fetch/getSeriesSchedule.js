export default async function getSeriesSchedule() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?status=schedule-list`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
