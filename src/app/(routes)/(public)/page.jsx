import getSeries from "@/fetch/getSeries";
import HomePage from "@/components/Page/HomePage";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const seriesData = await getSeries(20);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  const data = seriesData.data;

  // Filter series berdasarkan status
  const updatedSeries = data;
  const completedSeries = data.filter((anime) => anime.status === "completed");

  return (
    <HomePage updatedSeries={updatedSeries} completedSeries={completedSeries} />
  );
}
