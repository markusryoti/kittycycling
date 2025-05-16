import { differenceInCalendarDays } from "date-fns";
import type { RideSession, RideTarget } from "../ride-sessions/ride-sessions";

type ChartData = {
  date: string;
  distance?: number;
  goal?: number;
};

export function generateChartData(
  sessions: RideSession[],
  formatter: Intl.DateTimeFormat,
  rideTarget?: RideTarget
): ChartData[] {
  if (sessions.length === 0) return [];

  if (!rideTarget) {
    return generateWithoutTarget(sessions, formatter);
  } else {
    return generateWithTarget(sessions, rideTarget, formatter);
  }
}

function generateWithTarget(
  sessions: RideSession[],
  rideTarget: RideTarget,
  formatter: Intl.DateTimeFormat
) {
  const startDate = sessions[0].date;
  const endDate = rideTarget.date;
  const totalDays = differenceInCalendarDays(endDate, startDate);

  const dates = getDates(startDate, rideTarget.date);
  if (dates.length === 0) {
    console.warn("no dates found, returning");
    return [];
  }

  const distanceMap = mapSessions(sessions, formatter);
  if (distanceMap.size === 0) {
    console.warn("no distance got mapped, returning");
    return [];
  }

  let sum = 0;
  const cumulative = dates.map<ChartData>((d, i) => {
    const goal = getCurrentGoal(rideTarget.distance, totalDays, i);
    const formattedDate = formatter.format(d);
    const session = distanceMap.get(formattedDate);
    if (session) {
      sum += session.distance;
    }
    return { date: formattedDate, distance: sum, goal };
  });

  return cumulative;
}

function generateWithoutTarget(
  sessions: RideSession[],
  formatter: Intl.DateTimeFormat
) {
  let sum = 0;
  const cumulative = sessions.map<ChartData>((s) => {
    const curr = s.distance + sum;
    sum += s.distance;
    return { date: formatter.format(s.date), distance: curr };
  });

  return cumulative;
}

function getDates(startDate: Date, endDate: Date) {
  const dates = [];

  let current = new Date(startDate);
  while (current <= endDate) {
    const copied = new Date(current.getTime());
    dates.push(copied);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function mapSessions(sessions: RideSession[], formatter: Intl.DateTimeFormat) {
  const sum = 0;

  const distanceMap = new Map<string, RideSession>();

  sessions.forEach((s) => {
    const formatted = formatter.format(s.date);
    const curr = s.distance + sum;

    const existing = distanceMap.get(formatted);
    if (existing) {
      distanceMap.set(formatted, {
        id: s.id,
        date: s.date,
        distance: existing.distance + curr,
      });
    } else {
      distanceMap.set(formatted, {
        id: s.id,
        date: s.date,
        distance: curr,
      });
    }
  });

  return distanceMap;
}

function getCurrentGoal(totalDist: number, totalDays: number, x: number) {
  const goal = (totalDist / totalDays) * x;
  return Math.round(goal);
}
