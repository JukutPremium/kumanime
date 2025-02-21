import getSeriesOngoing from "@/fetch/getSeriesOngoing";
export default async function Ongoing() {
  const seriesData = await getSeriesOngoing();

  return (
    <div>
      <h2>Ongoing</h2>
      <pre>{JSON.stringify(seriesData, null, 2)}</pre>
    </div>
  );
}
