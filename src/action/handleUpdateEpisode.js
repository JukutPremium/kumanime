"use server";
import updateEpisode from "@/fetch/updateEpisode";
import { redirect } from "next/navigation";

export default async function handleUpdateEpisode(formData) {
  const slug = formData.get("slug");
  const episodeData = {
    order: 1 * formData.get("order"),
    videoServer: formData
      .get("videoServer")
      .split(";")
      .map((g) => g.trim()),
    seriesSlug: formData.get("seriesSlug"),
  };

  const result = await updateEpisode(slug, episodeData);

  if (result.error) {
    return redirect(
      `/dashboard/series/${episodeData.seriesSlug}?message=${result.error}&status=error`,
    );
  }

  return redirect(
    `/dashboard/series/${episodeData.seriesSlug}?message=Episode updated successfully&status=success`,
  );
}
