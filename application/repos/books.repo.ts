import { Book } from "@/models/books/book.model";
import { z } from "zod";

export const searchBooksInputSchema = z.object({
  value: z.string().min(1, "value is required"),
  type: z.enum(["title", "author", "publisher"]),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchBooksInput = z.input<typeof searchBooksInputSchema>;
export type SearchBooksValidInput = z.output<typeof searchBooksInputSchema>;

export type BooksRepo = {
  searchBooks: (payload: SearchBooksValidInput) => Promise<{
    books: Book[];
    totalAvailableItems: number;
  }>;
};
