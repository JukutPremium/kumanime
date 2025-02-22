// fetch/updateSeries.js
export default async function updateSeries(slug, seriesData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/series/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_SECRET}`,
    },
    body: JSON.stringify(seriesData),
  });
  return res.json();
}
