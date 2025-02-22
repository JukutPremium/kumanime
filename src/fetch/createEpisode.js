export default async function createSeries(episodeData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AUTH_SECRET}`,
    },
    body: JSON.stringify(episodeData),
  });
  return res.json();
}
