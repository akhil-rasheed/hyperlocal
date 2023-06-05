export default function formatCreatedAt(createdAt): string {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);
  const diff = currentDate.getTime() - createdAtDate.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffDays === 1) {
    const formattedTime = createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Yesterday at ${formattedTime}`;
  } else if (diffWeeks === 0) {
    const formattedDate = createdAtDate.toLocaleDateString(undefined, {
      weekday: "long",
    });
    const formattedTime = createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
  } else {
    const formattedDate = createdAtDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate;
  }
}
