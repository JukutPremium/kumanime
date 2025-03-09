"use server";

import deleteEpisodeBySlug from "@/fetch/deleteEpisodeBySlug";

export default async function deleteSeries(formData) {
  const slug = formData.get("slug");

  try {
    const deleteData = await deleteEpisodeBySlug(slug);

    // Jika API mengembalikan error
    if (deleteData?.error) {
      return {
        success: false,
        message: deleteData.error || "Failed to delete the series.",
      };
    }

    // Jika delete sukses, kirim data yang dihapus
    return {
      success: true,
      message: deleteData.status || "Series deleted successfully.",
      deletedData: deleteData.data, // Kirim detail data yang dihapus
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting the series.",
    };
  }
}
