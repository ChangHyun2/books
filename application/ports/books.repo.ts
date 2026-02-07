import { Book } from "@/domain/books/book.model";

export type SearchBooksQuery = {
  value: string;
  type: "title" | "author" | "publisher";
  page: number;
  perPage: number;
};

export type SearchBooksResult = {
  books: Book[];
  totalAvailableCount: number;
};

export type BooksRepo = {
  searchBooks: (payload: SearchBooksQuery) => Promise<SearchBooksResult>;
};
