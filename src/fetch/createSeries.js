export default async function createSeries(seriesData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/series`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AUTH_SECRET}`,
    },
    body: JSON.stringify(seriesData),
  });
  return res.json();
}
