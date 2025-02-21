export default async function series(req) {
  const params = await req.params;
  const seriesQuery = params.series;

  return (
    <div>
      <h2>Series : {seriesQuery}</h2>
    </div>
  );
}
