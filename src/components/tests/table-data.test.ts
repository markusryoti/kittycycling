import type { RideSession } from "@/lib/ride-sessions/ride-sessions";
import { expect, test } from "vitest";
import { getFilteredTableData } from "../ride-session-table";

const sampleData: RideSession[] = [
  {
    id: "2471e61a-7f70-4225-8d93-2cb4b63b2d4e",
    date: new Date("2025-04-09"),
    distance: 8,
  },
  {
    id: "0322b24e-15af-453a-8807-5b1ba8121a5e",
    date: new Date("2025-04-15"),
    distance: 25,
  },
  {
    id: "0d0e87ef-0c81-42ff-845f-63587869c9a5",
    date: new Date("2025-04-16"),
    distance: 52,
  },
  {
    id: "b5d5bfa1-fe6b-444c-a69c-c02da8028985",
    date: new Date("2025-04-19"),
    distance: 58,
  },
  {
    id: "12e3e478-ec91-4e6a-b078-3256ab532394",
    date: new Date("2025-04-21"),
    distance: 55,
  },
  {
    id: "fac654a2-3550-4b2e-9520-624dc5b32c1b",
    date: new Date("2025-04-23"),
    distance: 40,
  },
  {
    id: "0d599a99-1cd8-4bf6-9c2a-0ed676457ce9",
    date: new Date("2025-04-26"),
    distance: 65,
  },
  {
    id: "0e186fb7-7270-4157-93d2-d698534c71a2",
    date: new Date("2025-04-28"),
    distance: 60,
  },
  {
    id: "70999484-2499-406e-8762-fed11df88c0b",
    date: new Date("2025-04-30"),
    distance: 100,
  },
  {
    id: "94d78aeb-32f8-4f9b-8d9b-587b2a52f583",
    date: new Date("2025-05-03"),
    distance: 60,
  },
  {
    id: "3cdec94c-a995-4d50-b9ca-4ec953f6cb98",
    date: new Date("2025-05-05"),
    distance: 23,
  },
  {
    id: "4aa14a6a-61b7-4483-b029-ea284cdf81ff",
    date: new Date("2025-05-06"),
    distance: 41,
  },
  {
    id: "95d75524-76a6-4326-9bd7-d304235b2d5c",
    date: new Date("2025-05-07"),
    distance: 50,
  },
  {
    id: "cc00e08e-813c-4e98-b542-c9498527d1dc",
    date: new Date("2025-05-09"),
    distance: 48,
  },
  {
    id: "0e13709e-dba9-49dd-b098-97aee0e2b02f",
    date: new Date("2025-05-10"),
    distance: 40,
  },
  {
    id: "821c41a2-93f2-4c16-bfb3-5c58985b073b",
    date: new Date("2025-05-12"),
    distance: 62,
  },
  {
    id: "4a531c1e-0474-4105-bec0-36b765b63954",
    date: new Date("2025-05-14"),
    distance: 53,
  },
];

test("can get table data", () => {
  const data = getFilteredTableData(sampleData, 0, 5);

  expect(data).length(5);
});
