export function formatDate(isoString) {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    }) +
    ", " +
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}
