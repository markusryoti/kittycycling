import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRides } from "@/lib/ride-sessions";
import { Button } from "./ui/button";

export function TableDemo() {
  const { sessions, removeSession } = useRides();

  const total = sessions.reduce((prev, curr) => prev + curr.distance, 0);

  return (
    <div>
      <h2 className="text-2xl text-start mb-4">Ride Sessions</h2>
      <Table className="max-w-4xl">
        <TableCaption>A list of your ride sessions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
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
                  variant="destructive"
                  size="sm"
                  className="hover:cursor-pointer"
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-start">Total</TableCell>
            <TableCell className="text-start" colSpan={2}>
              {total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
