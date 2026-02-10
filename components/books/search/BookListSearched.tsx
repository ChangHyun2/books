"use client";

import QueryFallback from "../../QueryFallback";
import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";
import BookList from "../BookList";

export default function BookListSearched() {
  const { searchBooksQuery, totalCount } = useSearchBooksController();
  if (searchBooksQuery.isFetching) {
    return <QueryFallback query={searchBooksQuery} />;
  }

  if (searchBooksQuery.data) {
    const { books } = searchBooksQuery.data;
    return <BookList books={books} totalCount={totalCount} />;
  }

  return <QueryFallback query={searchBooksQuery} />;
}
