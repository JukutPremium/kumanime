export default async function updateEpisode(slug, episodeData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes/${slug}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
      body: JSON.stringify(episodeData),
    },
  );
  return res.json();
}
