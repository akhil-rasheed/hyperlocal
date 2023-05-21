function formatDate(date: Date, includeOrdinal: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: includeOrdinal ? undefined : "long",
    day: includeOrdinal ? "numeric" : undefined,
    month: includeOrdinal ? "long" : undefined,
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat(undefined, options);
  const formattedDate = formatter.format(date);

  if (includeOrdinal) {
    return formattedDate.replace(/\d+/, (match) =>
      addOrdinalSuffix(parseInt(match, 10))
    );
  } else {
    return formattedDate;
  }
}

function addOrdinalSuffix(number: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const relevantDigits = number % 100;
  const suffix =
    suffixes[(relevantDigits - 20) % 10] ||
    suffixes[relevantDigits] ||
    suffixes[0];
  return number + suffix;
}

export default function getReadableTime(isoTimestamp: Date): string {
  const date = new Date(isoTimestamp);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now.getTime() - date.getTime();

  // Check if the timestamp is within the last hour
  if (timeDifference < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDifference / (1000 * 60));
    return minutes <= 1
      ? "Just now 🔥"
      : `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  // Check if the timestamp is within the last day
  if (timeDifference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  // Check if the timestamp is from yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    const formattedTime = formatDate(date);
    return `Yesterday at ${formattedTime}`;
  }

  // Check if the timestamp is within the current week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const formattedTime = formatDate(date);
    return `${formattedTime}`;
  }

  // Display the date in the format "18th March at hh:mm"
  const formattedDate = formatDate(date, true);
  const formattedTime = formatDate(date);
  return `${formattedDate} at ${formattedTime}`;
}
