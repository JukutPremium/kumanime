import { notFound } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";
import AnimeInfoPage from "@/components/Page/AnimeInfoPage";

export async function generateMetadata(req) {
  const params = await req.params;
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  const { title, banner, synopsis } = seriesData.data;

  return {
    title,
    description: synopsis,
    openGraph: {
      images: [
        {
          url: banner, // Image for the open graph
        },
      ],
    },
  };
}

export default async function Series(req) {
  const params = await req.params;
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  return (
    <>
      <AnimeInfoPage seriesData={seriesData} />
    </>
  );
}
