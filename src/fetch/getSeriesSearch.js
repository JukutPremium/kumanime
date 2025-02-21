export default async function getSeriesSearch(search, page = 1, limit = 10) {
  const queryParam = search && search !== "kosong" ? `&search=${search}&` : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?page=${page}&limit=${limit + queryParam}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  return res.json();
}
