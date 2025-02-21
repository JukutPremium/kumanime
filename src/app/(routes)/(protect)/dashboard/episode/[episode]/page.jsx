export default async function Episode(req) {
  const params = await req.params;
  const episodeQuery = params.episode;

  return (
    <div>
      <h2>episode : {episodeQuery}</h2>
    </div>
  );
}
