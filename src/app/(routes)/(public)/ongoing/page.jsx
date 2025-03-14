import Link from "next/link";
import OngoingPage from "@/components/Page/OngoingPage";

import getSeriesOngoing from "@/fetch/getSeriesOngoing";

export const metadata = {
  title: "Onging Anime",
};

export default async function Ongoing(req) {
  const searchParams = await req.searchParams;
  const page = parseInt(searchParams.page) || 1;
  const limit = 1; // Bisa diubah sesuai kebutuhan

  const { data, total } = await getSeriesOngoing(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <OngoingPage
        data={data}
        total={total}
        totalPage={totalPages}
        page={page}
      />
    </>
  );
}
