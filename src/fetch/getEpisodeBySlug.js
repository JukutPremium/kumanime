export default async function getEpisodeBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
