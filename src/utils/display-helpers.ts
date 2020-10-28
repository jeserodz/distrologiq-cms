import { format, startOfDay, addSeconds } from 'date-fns';

export function displayDuration(duration?: number) {
  if (!duration) return 'N/D';
  const date = addSeconds(startOfDay(0), duration);
  return format(date, 'H:mm:ss');
}

export function displayDistance(distance?: number) {
  if (!distance) return 'N/D';
  return `${(distance / 1000).toFixed(1)} KM`;
}

export function displayRoutePerformance(
  estimatedDuration?: number,
  completedDuration?: number
) {
  if (!estimatedDuration || !completedDuration) return 'N/D';
  const value = (estimatedDuration / completedDuration) * 100;
  return `${value.toFixed(0)}%`;
}
