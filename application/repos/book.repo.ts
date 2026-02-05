import { Book } from "@/models/books/book.model";

export type SearchBooksQuery = {
  value: string;
  type: "title" | "author" | "publisher";
  page: number;
  perPage: number;
};

export type BookRepo = {
  searchBooks: (query: SearchBooksQuery) => Promise<{
    books: Book[];
    totalItems: number;
  }>;
};
