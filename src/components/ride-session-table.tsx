import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useRides, type RideSession } from "@/lib/ride-sessions/ride-sessions";
import { Trash2 } from "lucide-react";
import { isBefore } from "date-fns";
import { useState } from "react";
import TablePagination from "./table-pagination";

export function TableDemo() {
  const { sessions, removeSession } = useRides();
  const [currentPage, setCurrentPage] = useState(0);

  const rideSessions = [...sessions];

  const maxItems = 10;
  const numberOfSessions = rideSessions.length;
  const numPages = Math.ceil(numberOfSessions / maxItems) || 1;

  const filtered = getFilteredTableData(rideSessions, currentPage, maxItems);

  const totalDistance = rideSessions.reduce(
    (prev, curr) => prev + curr.distance,
    0
  );

  return (
    <div>
      <h2 className="text-2xl text-start mb-4">Ride Sessions</h2>
      <div>
        <Table className="max-w-4xl">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="text-start">
                  {Intl.DateTimeFormat().format(session.date)}
                </TableCell>
                <TableCell className="text-start">{session.distance}</TableCell>
                <TableCell
                  className="text-start"
                  onClick={() => removeSession(session.id)}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:cursor-pointer"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-start">Total</TableCell>
              <TableCell className="text-start" colSpan={2}>
                {totalDistance}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex py-6">
          <span className="text-gray-600 text-sm text-nowrap">
            {numberOfSessions} sessions
          </span>
          <TablePagination
            currentPage={currentPage}
            numberOfPages={numPages}
            handlePageChange={(n) => setCurrentPage(n)}
          />
        </div>
      </div>
    </div>
  );
}

export function getFilteredTableData(
  rideSessions: RideSession[],
  currentPage: number,
  maxItems: number
) {
  rideSessions.sort((a, b) => (isBefore(a.date, b.date) ? 1 : -1));

  const startIndex = currentPage * maxItems;
  const endIdex = startIndex + maxItems;

  const filtered = rideSessions.slice(
    Math.max(startIndex, 0),
    Math.min(endIdex, rideSessions.length)
  );

  return filtered;
}
