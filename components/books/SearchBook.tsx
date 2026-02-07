"use client";

import BookSearchBar from "./BookSearchBar";
import useSearchBooksController from "@/interfaces/controller/useSearchBooksController";
import { createSearchBooksUsecase } from "@/application/usecases/books/search-books";
import { bookRepo } from "@/infra/http/next/books/books.repo";
import BookList from "./BookList";
import QueryFallback from "../QueryFallback";

export default function SearchBook() {
  const { searchBooksQuery } = useSearchBooksController({
    usecase: createSearchBooksUsecase(bookRepo),
  });

  const body = searchBooksQuery.data ? (
    <BookList books={searchBooksQuery.data.books} />
  ) : (
    <QueryFallback query={searchBooksQuery} />
  );

  return (
    <div>
      <div className="mb-4">
        <BookSearchBar />
      </div>
      {body}
    </div>
  );
}
