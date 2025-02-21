import { notFound } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";

export default async function series(req) {
  const params = await req.params;
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  return (
    <div>
      <h2>Series : {seriesSlug}</h2>
      <div>{seriesData}</div>
    </div>
  );
}
