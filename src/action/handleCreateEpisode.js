"use server";
import createEpisode from "@/fetch/createEpisode";
import { redirect } from "next/navigation";

export default async function handleCreateEpisode(formData) {
  const episodeData = {
    order: 1 * formData.get("order"),
    videoServer: formData
      .get("videoServer")
      .split(";")
      .map((g) => g.trim()),
    seriesId: 1 * formData.get("seriesId"),
    seriesSlug: formData.get("seriesSlug"),
  };

  const result = await createEpisode(episodeData);

  if (result.error) {
    return redirect(
      `/dashboard/series/create/${episodeData.seriesSlug}?message=${result.error}&status=error`,
    );
  }

  return redirect(
    `/dashboard/episode/${result.data.slug}?message=Episode created successfully&status=success`,
  );
}
