"use server";
import updateEpisode from "@/fetch/updateEpisode";
import { redirect } from "next/navigation";

export default async function handleUpdateEpisode(formData) {
  const episodeData = {
    order: 1 * formData.get("order"),
    videoServer: formData
      .get("videoServer")
      .split(";")
      .map((g) => g.trim()),
    seriesId: 1 * formData.get("seriesId"),
    seriesId: 1 * formData.get("seriesId"),
    seriesSlug: formData.get("seriesSlug"),
  };

  const result = await updateEpisode(episodeData);

  if (result.error) {
    return redirect(
      `/dashboard/series/${episodeData.seriesSlug}?message=${result.error}&status=error`,
    );
  }

  return redirect(
    `/dashboard/series/${episodeData.seriesSlug}?message=Episode created successfully&status=success`,
  );
}
