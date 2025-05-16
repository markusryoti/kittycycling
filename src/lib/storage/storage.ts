import type { RideSession } from "../ride-sessions/ride-sessions";

export function parseStoredSessions(storedSessions: string | null) {
  try {
    const initialSessions: RideSession[] = storedSessions
      ? JSON.parse(storedSessions)
      : [];
    const converted = initialSessions.map((s) => {
      return { ...s, date: new Date(s.date) };
    });
    converted.sort((a, b) => (a.date > b.date ? 1 : -1));
    return converted;
  } catch (error) {
    return [];
  }
}

export function saveSessions(key: string, sessions: RideSession[]) {
  localStorage.setItem(key, JSON.stringify(sessions));
}
