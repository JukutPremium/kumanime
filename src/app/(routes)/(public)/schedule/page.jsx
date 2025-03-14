import Link from "next/link";
import getSeriesSchedule from "@/fetch/getSeriesSchedule";
import SchedulePage from "@/components/Page/SchedulePage";

export const metadata = {
  title: "Anime Schedule",
};

export default async function Schedule() {
  const { data } = await getSeriesSchedule();

  return <SchedulePage data={data} />;
}
