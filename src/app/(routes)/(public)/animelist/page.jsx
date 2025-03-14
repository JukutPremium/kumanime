import Link from "next/link";
import getSeriesAnimeList from "@/fetch/getSeriesAnimeList";
import AnimelistPage from "@/components/Page/AnimelistPage";

export const metadata = {
  title: "Anime List",
};

export default async function Animelist() {
  const { data } = await getSeriesAnimeList();

  return <AnimelistPage data={data} />;
}
