// action/handleUpdateSeries.js
"use server";
import updateSeries from "@/fetch/updateSeries";
import { redirect } from "next/navigation";

export default async function handleUpdateSeries(formData) {
  const slug = formData.get("slug");
  const seriesData = {
    title: formData.get("title"),
    banner: formData.get("banner"),
    synopsis: formData.get("synopsis"),
    status: formData.get("status"),
    studio: formData.get("studio"),
    season: formData.get("season"),
    type: formData.get("type"),
    scheduleDay: formData.get("scheduleDay"),
    genre: formData
      .get("genre")
      .split(";")
      .map((g) => g.trim()),
    preview: formData.get("preview") || null,
    censor: formData.get("censor") === "true",
  };

  const result = await updateSeries(slug, seriesData);

  if (result.error) {
    return redirect(`/dashboard?message=${result.error}&status=error`);
  }

  return redirect(
    `/dashboard?message=Series updated successfully&status=success`,
  );
}
