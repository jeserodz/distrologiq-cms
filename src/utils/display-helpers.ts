import { format, startOfDay, addSeconds } from "date-fns";

type Duration = number | null | undefined;

export function displayDuration(duration: Duration) {
  if (!duration) return "N/D";
  const date = addSeconds(startOfDay(0), duration);
  return format(date, "H:mm:ss");
}

export function displayDistance(distance: number) {
  return `${(distance / 1000).toFixed(1)} KM`;
}

export function displayRoutePerformance(estimatedDuration: Duration, completedDuration: Duration) {
  if (!estimatedDuration || !completedDuration) return "N/D";
  const value = (estimatedDuration / completedDuration) * 100;
  return `${value.toFixed(0)}%`;
}
