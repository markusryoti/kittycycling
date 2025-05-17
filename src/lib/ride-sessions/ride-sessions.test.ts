import { expect, test } from "vitest";
import { rideSessionReducer, type RideSessionState } from "./ride-sessions";
import { isEqual } from "date-fns";

const sampleState: RideSessionState = {
  rideTarget: {
    date: new Date("2025-07-01"),
    distance: 2500,
  },
  sessions: [
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
  ],
};

test("can add ride session", () => {
  const newId = "2ada3d65-cc05-4901-aa91-2f1ab691fe83";
  const newDate = new Date("2025-05-16");
  const newDistance = 53;

  const newState = rideSessionReducer(sampleState, {
    type: "add-session",
    payload: {
      session: {
        id: newId,
        date: newDate,
        distance: newDistance,
      },
    },
  });

  expect(newState.sessions).length(6);
  expect(newState.sessions[5].id).toBe(newId);
  expect(newState.sessions[5].distance).toBe(newDistance);
  expect(isEqual(newState.sessions[5].date, newDate)).toBe(true);
});

test("can remove ride session from the beginning", () => {
  const id = "00a81a06-2d0b-4db6-825a-308f790d4117";

  const newState = rideSessionReducer(sampleState, {
    type: "remove-session",
    payload: {
      id,
    },
  });

  expect(newState.sessions).length(4);
  newState.sessions.forEach((s) => expect(s.id).not.toBe(id));
});

test("can remove ride session from the middle", () => {
  const id = "e1e2b62d-546f-491e-9bf3-2548b172bca0";

  const newState = rideSessionReducer(sampleState, {
    type: "remove-session",
    payload: {
      id,
    },
  });

  expect(newState.sessions).length(4);
  newState.sessions.forEach((s) => expect(s.id).not.toBe(id));
});

test("can remove ride session from the end", () => {
  const id = "1bf4a494-3cba-451b-afaa-baf76e507a75";

  const newState = rideSessionReducer(sampleState, {
    type: "remove-session",
    payload: {
      id,
    },
  });

  expect(newState.sessions).length(4);
  newState.sessions.forEach((s) => expect(s.id).not.toBe(id));
});

test("can set ride target", () => {
  const newState = rideSessionReducer(sampleState, {
    type: "set-ride-target",
    payload: {
      rideTarget: {
        date: new Date("2025-05-17"),
        distance: 2000,
      },
    },
  });

  expect(newState.rideTarget?.distance).toBe(2000);
  expect(isEqual(newState.rideTarget!.date, new Date("2025-05-17"))).toBe(true);
});
