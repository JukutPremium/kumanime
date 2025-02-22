// action/createSeries.js
"use server";
import createSeries from "@/fetch/createSeries";
import { redirect } from "next/navigation";

export default async function handleCreateSeries(formData) {
  const seriesData = {
    title: formData.get("title"),
    banner: formData.get("banner"),
    slug: formData.get("slug"),
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

  const result = await createSeries(seriesData);

  if (result.error) {
    return redirect(`/dashboard?message=${result.error}&status=error`);
  }

  return redirect(
    `/dashboard?message=Series created successfully&status=success`,
  );
}
