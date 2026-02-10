"use client";

import { Separator } from "../ui/separator";
import BookItem from "./BookItem";
import { Book } from "@/domain/books/book.model";

export default function BookList({
  books,
  totalCount,
}: {
  books: Book[];
  totalCount: number;
}) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <div className="mr-4">도서 검색 결과</div>
        <div>
          총 <span className="font-bold text-primary">{totalCount}</span>건
        </div>
      </div>
      <Separator className="mb-2" />
      <ul>
        {books.map((book, index) => (
          <li key={book.id}>
            <BookItem book={book} />
            {index !== books.length - 1 && <Separator className="my-2" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
