import { Book } from "@/domain/books/book.model";

export type SearchBooksQuery = {
  value: string;
  page: number;
  perPage: number;
  type?: "title" | "author" | "publisher";
};

export type SearchBooksResult = {
  books: Book[];
  totalAvailableCount: number;
};

export type BooksRepo = {
  searchBooks: (payload: SearchBooksQuery) => Promise<SearchBooksResult>;
};
