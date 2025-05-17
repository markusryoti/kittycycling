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
import { useRides } from "@/lib/ride-sessions/ride-sessions";
import { Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";
import { isBefore } from "date-fns";
import { useState } from "react";

export function TableDemo() {
  const { sessions, removeSession } = useRides();
  const [currentPage, setCurrentPage] = useState(0);

  const rideSessions = [...sessions];
  rideSessions.sort((a, b) => (isBefore(a.date, b.date) ? 1 : -1));

  const totalDistance = rideSessions.reduce(
    (prev, curr) => prev + curr.distance,
    0
  );

  const numberOfSessions = rideSessions.length;
  const maxItems = 5;
  const numPages = Math.ceil(numberOfSessions / maxItems) || 1;

  const startIndex = currentPage * maxItems;
  const endIdex = startIndex + maxItems;

  const filtered = rideSessions.slice(
    Math.max(startIndex, 0),
    Math.min(endIdex, rideSessions.length)
  );

  const paginationItems = () => {
    const items = [];
    for (let i = 0; i < numPages; i++) {
      items.push(
        <PaginationItem key={crypto.randomUUID()}>
          <PaginationLink href="#">{i + 1}</PaginationLink>
        </PaginationItem>
      );
    }

    return <>{items}</>;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
          <Pagination className="">
            <PaginationContent>
              <PaginationItem>
                {currentPage === 0 ? (
                  <Button disabled variant="ghost">
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </Button>
                ) : (
                  <Button variant="ghost">
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </Button>
                )}
              </PaginationItem>
              {paginationItems()}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                {currentPage === numPages - 1 ? (
                  <Button disabled variant="ghost">
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </Button>
                ) : (
                  <Button variant="ghost">
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </Button>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
