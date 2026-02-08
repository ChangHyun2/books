"use client";

import QueryFallback from "../QueryFallback";
import { Separator } from "@radix-ui/react-select";
import BookItem from "./BookItem";
import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";

export default function BookList() {
  const { searchBooksQuery } = useSearchBooksController();

  if (!searchBooksQuery.data) {
    return <QueryFallback query={searchBooksQuery} />;
  }

  const { books } = searchBooksQuery.data;

  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        검색된 결과가 없습니다.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-4">도서 검색 결과</div>
        <div>
          총 <span className="font-bold text-primary">{books.length}</span>건
        </div>
      </div>
      <Separator className="mb-2" />
      {books.map((book, index) => (
        <div key={book.id}>
          <BookItem book={book} />
          {index !== books.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
      <Separator className="mt-2" />
    </div>
  );
}
