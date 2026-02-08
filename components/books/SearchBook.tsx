"use client";

import BookSearchBar from "./BookSearchBar";
import {
  SearchBooksProvider,
  useSearchBooks,
} from "@/interfaces/controller/useSearchBooksController";
import { createSearchBooksUsecase } from "@/application/usecases/books/search-books";
import { bookRepo } from "@/infra/http/next/books/books.repo";
import BookList from "./BookList";
import QueryFallback from "../QueryFallback";

function SearchBookBody() {
  const { searchBooksQuery } = useSearchBooks();

  return (
    <div className="h-[400px]">
      {searchBooksQuery.data ? (
        <BookList books={searchBooksQuery.data.books} />
      ) : (
        <QueryFallback query={searchBooksQuery} />
      )}
    </div>
  );
}

export default function SearchBook() {
  return (
    <SearchBooksProvider usecase={createSearchBooksUsecase(bookRepo)}>
      <div>
        <div className="mb-4">
          <BookSearchBar />
        </div>
        <SearchBookBody />
      </div>
    </SearchBooksProvider>
  );
}
