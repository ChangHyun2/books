"use client";

import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";
import BookPagination from "./BookPagination";

export default function SearchBookPagination() {
  const { submit, totalPages } = useSearchBooksController();

  const handlePageChange = (page: number) => {
    submit({ page });
  };

  return (
    <BookPagination totalPages={totalPages} onPageChange={handlePageChange} />
  );
}
