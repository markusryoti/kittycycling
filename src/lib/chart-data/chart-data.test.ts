import { test, expect } from "vitest";
import type { RideSessionState } from "../ride-sessions/ride-sessions";
import { generateChartData } from "./chart-data";

const sampleState: RideSessionState = {
  rideTarget: {
    date: new Date("2025-05-12"),
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

const dateGenerationData = {
  rideTarget: {
    date: new Date("2025-05-06"),
    distance: 100,
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
      date: new Date("2025-05-04"),
      distance: 34,
    },
  ],
};

test("chart generation doesn't fail with empty data", () => {
  const chartData = generateChartData(
    [],
    Intl.DateTimeFormat(),
    sampleState.rideTarget
  );
  expect(chartData).length(0);
});

test("can generate chart data without ride target", () => {
  const chartData = generateChartData(
    sampleState.sessions,
    Intl.DateTimeFormat("en-US"),
    undefined
  );
  expect(chartData).length(5);
  expect(chartData[4].distance).toBe(197);
  expect(chartData[0].date).toBe("5/1/2025");
  expect(chartData[4].date).toBe("5/10/2025");
});

test("can generate chart data with ride target", () => {
  const dataSnapshot = JSON.stringify(sampleState);

  const chartData = generateChartData(
    sampleState.sessions,
    Intl.DateTimeFormat("en-US"),
    sampleState.rideTarget
  );

  expect(chartData).length(12);

  expect(chartData[0].date).toBe("5/1/2025");
  expect(chartData[0].distance).toBe(17);
  expect(chartData[0].goal).toBe(0);
  expect(chartData[chartData.length - 1].date).toBe("5/12/2025");
  expect(chartData[chartData.length - 1].distance).toBe(197);
  expect(chartData[chartData.length - 1].goal).toBe(2500);

  expect(JSON.stringify(sampleState)).toBe(dataSnapshot);
});

test("dates are generated properly with a target", () => {
  const chartData = generateChartData(
    dateGenerationData.sessions,
    Intl.DateTimeFormat("en-US"),
    dateGenerationData.rideTarget
  );

  expect(chartData).length(6);

  expect(chartData[0].date).toBe("5/1/2025");
  expect(chartData[1].date).toBe("5/2/2025");
  expect(chartData[2].date).toBe("5/3/2025");
  expect(chartData[3].date).toBe("5/4/2025");
  expect(chartData[4].date).toBe("5/5/2025");
  expect(chartData[5].date).toBe("5/6/2025");
});

test("dates are generated properly without a target", () => {
  const chartData = generateChartData(
    dateGenerationData.sessions,
    Intl.DateTimeFormat("en-US"),
    undefined
  );

  expect(chartData).length(3);

  expect(chartData[0].date).toBe("5/1/2025");
  expect(chartData[1].date).toBe("5/2/2025");
  expect(chartData[2].date).toBe("5/4/2025");
});
