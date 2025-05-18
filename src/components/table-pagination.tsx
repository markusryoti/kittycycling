import { Button } from "./ui/button";
import {
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

type TablePaginationProps = {
  currentPage: number;
  numberOfPages: number;
  handlePageChange: (newPage: number) => void;
};

export default function TablePagination({
  currentPage,
  numberOfPages,
  handlePageChange,
}: TablePaginationProps) {
  const paginationItems = (
    numPages: number,
    handlePageChange: (newPage: number) => void
  ) => {
    const items = [];

    for (let i = 0; i < numPages; i++) {
      // Don't show more than current+1
      if (i > 2 && i > currentPage + 1) {
        break;
      }

      // Don't show more than current-1
      if (i > 2 && i < currentPage - 1) {
        continue;
      }

      // Ellipsis
      if (i == 2) {
        items.push(
          <PaginationItem key={crypto.randomUUID()}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={crypto.randomUUID()}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return <>{items}</>;
  };

  return (
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
        {paginationItems(numberOfPages, handlePageChange)}
        <PaginationItem>
          {currentPage === numberOfPages - 1 ? (
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
  );
}
