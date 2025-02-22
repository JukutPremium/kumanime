export default async function UpdateSeries(req) {
  const params = await req.params;
  const seriesQuery = params.series;

  return (
    <div>
      <h2>Series : {seriesQuery}</h2>
    </div>
  );
}
