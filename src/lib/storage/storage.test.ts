import { expect, test } from "vitest";
import type { RideSession } from "../ride-sessions/ride-sessions";
import { parseStoredSessions } from "./storage";
import { isEqual } from "date-fns";

const sampleData: RideSession[] = [
  {
    id: "00a81a06-2d0b-4db6-825a-308f790d4117",
    date: new Date("2025-05-01"),
    distance: 17,
  },
  {
    id: "a1f650ec-564e-4a7d-8855-c81c2edf017d",
    date: new Date("2025-05-02"),
    distance: 28,
  },
  {
    id: "e1e2b62d-546f-491e-9bf3-2548b172bca0",
    date: new Date("2025-05-05"),
    distance: 34,
  },
  {
    id: "9316bec6-9710-42d5-9f07-133ddbe226cd",
    date: new Date("2025-05-07"),
    distance: 57,
  },
  {
    id: "1bf4a494-3cba-451b-afaa-baf76e507a75",
    date: new Date("2025-05-10"),
    distance: 61,
  },
];

test("can read json from storage", () => {
  const sessions = parseStoredSessions(JSON.stringify(sampleData));
  expect(sessions).length(5);

  for (let i = 0; i < 5; i++) {
    expect(sessions[i].id).toBe(sampleData[i].id);
    expect(sessions[i].distance).toBe(sampleData[i].distance);
    expect(isEqual(sessions[i].date, sampleData[i].date)).toBe(true);
  }
});
